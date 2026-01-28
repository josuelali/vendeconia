import OpenAI from "openai";
import { InsertProduct } from "@shared/schema";

/** Crea el cliente SOLO si hay API key (evita errores raros al arrancar) */
function getOpenAIClient(): OpenAI | null {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}

// Helpers
function safeString(v: any, fallback = ""): string {
  if (typeof v === "string") return v.trim();
  if (v == null) return fallback;
  return String(v).trim();
}

function safeNumber(v: any, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function ensureTags(v: any): string[] {
  if (Array.isArray(v)) {
    return v
      .map((x) => safeString(x))
      .filter(Boolean)
      .slice(0, 5);
  }
  if (typeof v === "string") {
    return v
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 5);
  }
  return [];
}

function ensureViews(v: any, idx: number): string {
  const s = safeString(v);
  return s || `${10 + idx * 5}k+`;
}

function ensureName(p: any, idx: number): string {
  const name =
    safeString(p?.name) || safeString(p?.title) || safeString(p?.productName);

  if (name) return name;

  const desc = safeString(p?.description);
  if (desc) return `Producto recomendado #${idx + 1}`;

  return `Producto viral #${idx + 1}`;
}

function pickImage(idx: number): string {
  const productImages = [
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=500&h=350",
  ];
  return productImages[idx % productImages.length];
}

/**
 * Normaliza y BLINDA la salida para que:
 * - siempre haya name (nunca null)
 * - siempre haya description, price, imageUrl
 * - las flags sean boolean
 */
function normalizeProducts(raw: any): InsertProduct[] {
  // Acepta: { products: [...] } o [...] directo
  const arr = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.products)
      ? raw.products
      : [];

  return arr.slice(0, 5).map((p: any, idx: number) => {
    const trending =
      typeof p?.trending === "boolean" ? p.trending : idx % 2 === 0;
    const viral = typeof p?.viral === "boolean" ? p.viral : idx === 1;
    const popular =
      typeof p?.popular === "boolean" ? p.popular : !trending && !viral;

    const out: any = {
      name: ensureName(p, idx),
      description: safeString(p?.description, "Producto recomendado para ti."),
      price: safeString(p?.price, "€19.99"),
      imageUrl: safeString(p?.imageUrl) || pickImage(idx),
      rating: safeNumber(p?.rating, 4.5),
      reviews: Math.max(0, Math.floor(safeNumber(p?.reviews, 300))),
      trending,
      viral,
      popular,
      views: ensureViews(p?.views, idx),
      tags: ensureTags(p?.tags),
      // NO userId aquí (lo añade routes.ts al guardar)
    };

    // Seguro extra anti-DB
    if (!out.name) out.name = `Producto viral #${idx + 1}`;
    if (!out.description) out.description = "Producto recomendado para ti.";
    if (!out.price) out.price = "€19.99";
    if (!out.imageUrl) out.imageUrl = pickImage(idx);

    return out as InsertProduct;
  });
}

// Generate text using OpenAI
export async function generateText(prompt: string): Promise<string> {
  try {
    const client = getOpenAIClient();
    if (!client) return "No hay API Key configurada. (modo demo)";

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating text with OpenAI:", error);
    return "No se pudo generar texto ahora mismo. (modo demo)";
  }
}

// Generate product ideas
export async function generateProductIdeas(
  category: string,
  priceRange: number,
  trendingOnly?: boolean,
  fastShipping?: boolean,
): Promise<InsertProduct[]> {
  const priceLabels = [
    "Muy económico",
    "Económico",
    "Medio",
    "Premium",
    "Lujo",
  ];
  const idx = Math.max(0, Math.min(4, (priceRange || 3) - 1));
  const priceLabel = priceLabels[idx];

  const client = getOpenAIClient();

  // Sin key: fallback directo
  if (!client) {
    console.warn("No OpenAI API key found, using fallback product ideas");
    return fallbackProductIdeas(
      category,
      priceRange,
      trendingOnly,
      fastShipping,
    );
  }

  try {
    const prompt = `
Genera 5 productos virales para vender online en la categoría: "${category}".
Rango de precio: "${priceLabel}".
${trendingOnly ? "Deben estar en tendencia actualmente." : ""}
${fastShipping ? "Deben poder enviarse rápido." : ""}

Devuelve ÚNICAMENTE un JSON con esta forma EXACTA:
{
  "products": [
    {
      "name": "string",
      "description": "string (max 150 caracteres)",
      "price": "string con € (ej: €19.99 o €12 - €25)",
      "imageUrl": "string (puede ir vacío)",
      "rating": 1-5,
      "reviews": number,
      "trending": boolean,
      "viral": boolean,
      "popular": boolean,
      "views": "string (ej: 25k+)",
      "tags": ["tag1","tag2","tag3"]
    }
  ]
}
`.trim();

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response from OpenAI");

    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error(
        "OpenAI returned non-JSON content, using fallback:",
        content,
      );
      return fallbackProductIdeas(
        category,
        priceRange,
        trendingOnly,
        fastShipping,
      );
    }

    const normalized = normalizeProducts(parsed);

    if (!normalized.length) {
      return fallbackProductIdeas(
        category,
        priceRange,
        trendingOnly,
        fastShipping,
      );
    }

    return normalized;
  } catch (error: any) {
    // ✅ 401/429/etc -> fallback (sin romper la app)
    console.error(
      "OpenAI failed, using fallback:",
      error?.status || error?.message || error,
    );
    return fallbackProductIdeas(
      category,
      priceRange,
      trendingOnly,
      fastShipping,
    );
  }
}

// Fallback product ideas
function fallbackProductIdeas(
  category: string,
  priceRange: number,
  trendingOnly?: boolean,
  fastShipping?: boolean,
): InsertProduct[] {
  const productBasicInfo = [
    {
      name: "Organizador Multifuncional para Gadgets",
      description:
        "Mantén cables y accesorios organizados con este estuche resistente al agua.",
      price: "€19.99",
      imageUrl: pickImage(0),
      tags: ["Tecnología", "Organización", "Unisex"],
    },
    {
      name: "Botella Motivacional con Indicador de Tiempo",
      description: "Botella que te recuerda cuándo beber agua. Libre de BPA.",
      price: "€24.99",
      imageUrl: pickImage(1),
      tags: ["Fitness", "Ecológico", "Bestseller"],
    },
    {
      name: "Luz LED Inteligente Multicolor",
      description: "Luz LED con millones de colores y control por app.",
      price: "€29.99",
      imageUrl: pickImage(2),
      tags: ["Smart Home", "Decoración", "WiFi"],
    },
    {
      name: "Alfombrilla de Carga Inalámbrica 3 en 1",
      description:
        "Carga móvil, reloj y auriculares a la vez. Compacta y elegante.",
      price: "€34.99",
      imageUrl: pickImage(3),
      tags: ["Tecnología", "Gadgets", "Carga"],
    },
    {
      name: "Proyector de Estrellas con Altavoz Bluetooth",
      description: "Convierte tu habitación en un cielo estrellado con música.",
      price: "€39.99",
      imageUrl: pickImage(4),
      tags: ["Hogar", "Relajación", "Tecnología"],
    },
  ];

  return productBasicInfo.map((basicInfo, index) => {
    const isTrending = trendingOnly ? true : index % 2 === 0;
    const isViral = index === 1;
    const isPopular = !isTrending && !isViral;

    const out: any = {
      ...basicInfo,
      rating: 4 + (index % 2) * 0.5,
      reviews: 300 + index * 100,
      trending: isTrending,
      viral: isViral,
      popular: isPopular,
      views: `${10 + index * 5}k+`,
      tags: ensureTags(basicInfo.tags),
    };

    // Seguro extra
    if (!out.name) out.name = `Producto viral #${index + 1}`;
    if (!out.description) out.description = "Producto recomendado para ti.";
    if (!out.price) out.price = "€19.99";
    if (!out.imageUrl) out.imageUrl = pickImage(index);

    return out as InsertProduct;
  });
}

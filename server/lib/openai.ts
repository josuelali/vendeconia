import OpenAI from "openai";
import { InsertProduct } from "@shared/schema";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
  if (Array.isArray(v))
    return v
      .map((x) => safeString(x))
      .filter(Boolean)
      .slice(0, 5);
  if (typeof v === "string")
    return v
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 5);
  return [];
}

function ensureViews(v: any, idx: number): string {
  const s = safeString(v);
  if (s) return s;
  return `${10 + idx * 5}k+`;
}

function ensureName(p: any, idx: number): string {
  const name =
    safeString(p?.name) || safeString(p?.title) || safeString(p?.productName);

  if (name) return name;

  const desc = safeString(p?.description);
  if (desc) return `Producto recomendado #${idx + 1}`;

  return `Producto viral #${idx + 1}`;
}

function normalizeProducts(raw: any): InsertProduct[] {
  // Acepta: { products: [...] }  o  [...] directo
  const arr = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.products)
      ? raw.products
      : [];

  // Imágenes placeholder
  const productImages = [
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=500&h=350",
  ];

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
      imageUrl:
        safeString(p?.imageUrl) || productImages[idx % productImages.length],
      rating: safeNumber(p?.rating, 4.5),
      reviews: Math.max(0, Math.floor(safeNumber(p?.reviews, 300))),
      trending,
      viral,
      popular,
      views: ensureViews(p?.views, idx),
      tags: ensureTags(p?.tags),
      // OJO: userId NO lo pongas aquí; se lo mete routes.ts al guardar
    };

    // Garantía anti-DB: name nunca vacío
    if (!out.name) out.name = `Producto viral #${idx + 1}`;

    return out as InsertProduct;
  });
}

// Generate text using OpenAI
export async function generateText(prompt: string): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return "No hay API Key configurada. (modo demo)";
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Error generating text with OpenAI:", error);
    // No reventamos la app
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
  const priceLabel =
    priceLabels[Math.max(0, Math.min(4, (priceRange || 3) - 1))];

  // Si NO hay key: fallback directo
  if (!process.env.OPENAI_API_KEY) {
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
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("Empty response from OpenAI");

    const parsed = JSON.parse(content);

    // Normalizamos para evitar name=null y formatos raros
    const normalized = normalizeProducts(parsed);

    // Si por lo que sea viene vacío, fallback
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
    // Si OpenAI falla por 401/429/etc -> fallback (NO petar)
    console.error("Error generating product ideas:", error);
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
      imageUrl:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&h=350",
      tags: ["Tecnología", "Organización", "Unisex"],
    },
    {
      name: "Botella Motivacional con Indicador de Tiempo",
      description: "Botella que te recuerda cuándo beber agua. Libre de BPA.",
      price: "€24.99",
      imageUrl:
        "https://images.unsplash.com/photo-1526401485004-2aa7f3f8b2d6?auto=format&fit=crop&w=500&h=350",
      tags: ["Fitness", "Ecológico", "Bestseller"],
    },
    {
      name: "Luz LED Inteligente Multicolor",
      description: "Luz LED con millones de colores y control por app.",
      price: "€29.99",
      imageUrl:
        "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&h=350",
      tags: ["Smart Home", "Decoración", "WiFi"],
    },
    {
      name: "Alfombrilla de Carga Inalámbrica 3 en 1",
      description:
        "Carga móvil, reloj y auriculares a la vez. Compacta y elegante.",
      price: "€34.99",
      imageUrl:
        "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=500&h=350",
      tags: ["Tecnología", "Gadgets", "Carga"],
    },
    {
      name: "Proyector de Estrellas con Altavoz Bluetooth",
      description: "Convierte tu habitación en un cielo estrellado con música.",
      price: "€39.99",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&h=350",
      tags: ["Hogar", "Relajación", "Tecnología"],
    },
  ];

  return productBasicInfo.map((basicInfo, index) => {
    const isTrending = trendingOnly ? true : index % 2 === 0;
    const isViral = index === 1;
    const isPopular = !isTrending && !isViral;

    return {
      ...basicInfo,
      rating: 4 + (index % 2) * 0.5,
      reviews: 300 + index * 100,
      trending: isTrending,
      viral: isViral,
      popular: isPopular,
      views: `${10 + index * 5}k+`,
    } as InsertProduct;
  });
}

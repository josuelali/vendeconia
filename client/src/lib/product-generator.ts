import { parseAmazonInput } from "@/lib/amazon";

export interface GeneratedProductBase {
  asin: string;
  inputType: "url" | "asin";
  sourceLabel: string;
  canonicalUrl: string;
  marketplace: string;
  baseName: string;
  category: string;
  buyerIntent: string;
  angle: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  pros: string[];
  cons: string[];
  cta: string;
  shortScript: string;
  reviewIntro: string;
  slug: string;
  affiliateBlock: string;
  notes: string[];
}

const CATEGORY_RULES = [
  {
    category: "Tecnología y gadgets",
    keywords: [
      "portatil",
      "portátil",
      "laptop",
      "teclado",
      "raton",
      "ratón",
      "auriculares",
      "microfono",
      "micrófono",
      "webcam",
      "tablet",
      "smartwatch",
      "cargador",
      "powerbank",
      "hdmi",
      "gaming",
      "monitor",
      "usb",
      "ssd",
      "disco duro",
      "router",
    ],
    buyerIntent: "resolver una necesidad práctica sin gastar de más",
    angle: "utilidad inmediata y compra fácil de justificar",
  },
  {
    category: "Hogar",
    keywords: [
      "lampara",
      "lámpara",
      "organizador",
      "cocina",
      "aspirador",
      "cafetera",
      "freidora",
      "almacenamiento",
      "soporte",
      "limpieza",
      "escritorio",
      "manta",
      "colchon",
      "colchón",
      "humidificador",
      "purificador",
    ],
    buyerIntent: "mejorar comodidad, orden o eficiencia en casa",
    angle: "ahorro de tiempo y mejora del día a día",
  },
  {
    category: "Salud y bienestar",
    keywords: [
      "masaje",
      "postura",
      "ergonomico",
      "ergonómico",
      "almohada",
      "relajacion",
      "relajación",
      "fitness",
      "ejercicio",
      "salud",
      "movilidad",
    ],
    buyerIntent: "mejorar confort personal con una compra simple",
    angle: "bienestar, comodidad y uso constante",
  },
  {
    category: "Accesorios y lifestyle",
    keywords: [
      "mochila",
      "bolso",
      "cartera",
      "viaje",
      "coche",
      "auto",
      "maleta",
      "botella",
      "led",
      "soporte movil",
      "soporte móvil",
    ],
    buyerIntent: "comprar algo práctico, visual y fácil de recomendar",
    angle: "comodidad, valor percibido y uso frecuente",
  },
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function toSentenceCase(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createSlug(baseName: string, asin: string) {
  const normalized = normalizeText(baseName)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return normalized
    ? `${normalized}-${asin.toLowerCase()}`
    : `producto-amazon-${asin.toLowerCase()}`;
}

function detectCategory(baseName: string) {
  const normalized = normalizeText(baseName);

  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((keyword) => normalized.includes(normalizeText(keyword)))) {
      return rule;
    }
  }

  return {
    category: "Producto recomendado",
    buyerIntent: "encontrar una compra útil y fácil de entender",
    angle: "utilidad práctica y decisión rápida",
  };
}

function buildPros(baseName: string, category: string, angle: string) {
  return [
    `Puede convertirse rápido en una ficha de ${category.toLowerCase()} orientada a conversión.`,
    `Encaja bien en comparativas, reviews rápidas y contenido evergreen si el producto real cumple lo prometido.`,
    `Permite trabajar un enfoque de ${angle} sin recurrir a un copy exagerado.`,
  ];
}

function buildCons(baseName: string) {
  return [
    `Esta base se ha generado sin leer la ficha real de ${baseName}; conviene verificar especificaciones y variantes.`,
    "No incluye precio en tiempo real, valoraciones ni datos técnicos extraídos automáticamente.",
    "Antes de publicar en GadgetsMania conviene revisar competencia, disponibilidad y política de afiliación.",
  ];
}

function buildMetaDescription(baseName: string, buyerIntent: string) {
  return `Descubra ${baseName}, una opción interesante para quien busca ${buyerIntent}. Resumen rápido, puntos fuertes, puntos débiles y enfoque útil para decidir mejor.`;
}

function buildAffiliateBlock(baseName: string, canonicalUrl: string, cta: string) {
  return [
    `<div class="affiliate-box affiliate-box-amazon">`,
    `  <p class="affiliate-box__title">${baseName}</p>`,
    `  <p class="affiliate-box__text">${cta}</p>`,
    `  <a href="${canonicalUrl}" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box__button">Ver en Amazon</a>`,
    `</div>`,
  ].join("\n");
}

export function generateProductBase(input: string): GeneratedProductBase {
  const parsed = parseAmazonInput(input);

  if (!parsed.asin || !parsed.normalizedUrl || parsed.inputType === "invalid") {
    throw new Error(parsed.errors[0] || "No se pudo procesar la entrada.");
  }

  const baseName = toSentenceCase(parsed.inferredName);
  const rule = detectCategory(baseName);

  const seoTitle = `${baseName}: opinión rápida, pros, contras y si merece la pena`;
  const metaDescription = buildMetaDescription(baseName, rule.buyerIntent);
  const summary = `${baseName} puede trabajarse como una pieza orientada a ${rule.buyerIntent}. La base resultante sirve para review breve, comparativa, CTA afiliado o short de apoyo en GadgetsMania.`;
  const cta = `Ver ${baseName} en Amazon y comprobar precio, disponibilidad y opiniones recientes.`;
  const shortScript = `Hoy le traigo ${baseName}. Si busca ${rule.buyerIntent}, este producto puede ser una opción interesante. En pocos segundos le resumo lo importante: qué aporta, para quién encaja y qué revisar antes de comprar. Le dejo el enlace para que vea precio y valoraciones.`;
  const reviewIntro = `${baseName} es una opción con potencial para contenido afiliado si se trabaja con enfoque práctico, beneficios claros y una llamada a la acción limpia.`;
  const notes = [
    "Base generada desde URL o ASIN, no desde scraping en tiempo real.",
    "Revise título exacto, precio, imágenes y reseñas antes de publicar.",
    "Ideal como semilla para review, comparativa, CTA o guion corto.",
  ];

  return {
    asin: parsed.asin,
    inputType: parsed.inputType,
    sourceLabel: parsed.inputType === "asin" ? "ASIN directo" : "URL Amazon",
    canonicalUrl: parsed.normalizedUrl,
    marketplace: parsed.marketplace,
    baseName,
    category: rule.category,
    buyerIntent: rule.buyerIntent,
    angle: rule.angle,
    seoTitle,
    metaDescription,
    summary,
    pros: buildPros(baseName, rule.category, rule.angle),
    cons: buildCons(baseName),
    cta,
    shortScript,
    reviewIntro,
    slug: createSlug(baseName, parsed.asin),
    affiliateBlock: buildAffiliateBlock(baseName, parsed.normalizedUrl, cta),
    notes,
  };
}
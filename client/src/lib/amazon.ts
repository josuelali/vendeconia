const AMAZON_HOST_PATTERN = /(^|\.)amazon\.[a-z.]+$/i;
const ASIN_PATTERN = /^[A-Z0-9]{10}$/;

export type AmazonInputType = "url" | "asin" | "invalid";

export interface AmazonParseResult {
  inputType: AmazonInputType;
  asin: string | null;
  normalizedUrl: string | null;
  rawUrl: string | null;
  slug: string;
  inferredName: string;
  marketplace: string;
  errors: string[];
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function titleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function cleanSlugToName(slug: string) {
  const withoutHyphens = slug
    .replace(/[-_]+/g, " ")
    .replace(/\b(ref|th|psc|smid|linkcode|tag|language|keywords|sr|qid)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!withoutHyphens) {
    return "Producto Amazon";
  }

  return titleCase(withoutHyphens);
}

function detectMarketplace(hostname: string) {
  const normalized = hostname.toLowerCase();

  if (normalized.endsWith("amazon.es")) return "Amazon España";
  if (normalized.endsWith("amazon.com")) return "Amazon USA";
  if (normalized.endsWith("amazon.it")) return "Amazon Italia";
  if (normalized.endsWith("amazon.de")) return "Amazon Alemania";
  if (normalized.endsWith("amazon.fr")) return "Amazon Francia";
  if (normalized.endsWith("amazon.co.uk")) return "Amazon Reino Unido";
  if (normalized.endsWith("amazon.nl")) return "Amazon Países Bajos";
  if (normalized.endsWith("amazon.pl")) return "Amazon Polonia";
  if (normalized.endsWith("amazon.com.be")) return "Amazon Bélgica";
  if (normalized.endsWith("amazon.com.tr")) return "Amazon Turquía";
  if (normalized.endsWith("amazon.mx")) return "Amazon México";

  return "Amazon";
}

function extractAsinFromUrl(url: URL) {
  const path = url.pathname;

  const patterns = [
    /\/dp\/([A-Z0-9]{10})(?:[/?]|$)/i,
    /\/gp\/product\/([A-Z0-9]{10})(?:[/?]|$)/i,
    /\/product\/([A-Z0-9]{10})(?:[/?]|$)/i,
    /\/ASIN\/([A-Z0-9]{10})(?:[/?]|$)/i,
    /\/([A-Z0-9]{10})(?:[/?]|$)/i,
  ];

  for (const pattern of patterns) {
    const match = path.match(pattern);
    if (match?.[1]) {
      return match[1].toUpperCase();
    }
  }

  const queryAsin =
    url.searchParams.get("asin") ||
    url.searchParams.get("ASIN") ||
    url.searchParams.get("mASIN");

  if (queryAsin && ASIN_PATTERN.test(queryAsin.toUpperCase())) {
    return queryAsin.toUpperCase();
  }

  return null;
}

function extractSlugFromPath(pathname: string, asin: string | null) {
  const segments = pathname
    .split("/")
    .map((segment) => decodeURIComponent(segment).trim())
    .filter(Boolean);

  const meaningfulSegments = segments.filter((segment) => {
    const upper = segment.toUpperCase();
    if (asin && upper === asin) return false;
    if (
      ["dp", "gp", "product", "s", "stores", "deal", "deals"].includes(
        segment.toLowerCase()
      )
    ) {
      return false;
    }
    return /[a-zA-Z]/.test(segment);
  });

  const slugCandidate = meaningfulSegments[meaningfulSegments.length - 1] || "";
  return slugCandidate.toLowerCase();
}

function buildCanonicalAmazonUrl(hostname: string, asin: string) {
  return `https://${hostname}/dp/${asin}`;
}

export function parseAmazonInput(input: string): AmazonParseResult {
  const value = normalizeWhitespace(input);

  if (!value) {
    return {
      inputType: "invalid",
      asin: null,
      normalizedUrl: null,
      rawUrl: null,
      slug: "",
      inferredName: "",
      marketplace: "Amazon",
      errors: ["Introduzca una URL de Amazon o un ASIN válido."],
    };
  }

  const upperValue = value.toUpperCase();

  if (ASIN_PATTERN.test(upperValue)) {
    return {
      inputType: "asin",
      asin: upperValue,
      normalizedUrl: buildCanonicalAmazonUrl("www.amazon.es", upperValue),
      rawUrl: null,
      slug: "",
      inferredName: `Producto Amazon ${upperValue}`,
      marketplace: "Amazon España",
      errors: [],
    };
  }

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    return {
      inputType: "invalid",
      asin: null,
      normalizedUrl: null,
      rawUrl: value,
      slug: "",
      inferredName: "",
      marketplace: "Amazon",
      errors: ["La entrada no es una URL válida ni un ASIN de 10 caracteres."],
    };
  }

  if (!AMAZON_HOST_PATTERN.test(url.hostname)) {
    return {
      inputType: "invalid",
      asin: null,
      normalizedUrl: null,
      rawUrl: value,
      slug: "",
      inferredName: "",
      marketplace: "Amazon",
      errors: ["La URL debe pertenecer a un dominio de Amazon."],
    };
  }

  const asin = extractAsinFromUrl(url);

  if (!asin) {
    return {
      inputType: "invalid",
      asin: null,
      normalizedUrl: null,
      rawUrl: value,
      slug: "",
      inferredName: "",
      marketplace: detectMarketplace(url.hostname),
      errors: ["No se ha podido extraer un ASIN válido de la URL de Amazon."],
    };
  }

  const slug = extractSlugFromPath(url.pathname, asin);
  const inferredName = cleanSlugToName(slug || `producto amazon ${asin}`);

  return {
    inputType: "url",
    asin,
    normalizedUrl: buildCanonicalAmazonUrl(url.hostname, asin),
    rawUrl: value,
    slug,
    inferredName,
    marketplace: detectMarketplace(url.hostname),
    errors: [],
  };
}
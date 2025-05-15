import OpenAI from "openai";
import { InsertProduct } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate text using OpenAI
export async function generateText(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Error generating text with OpenAI:", error);
    throw new Error("Failed to generate text. Please try again later.");
  }
}

// Generate product ideas based on category, price range, etc.
export async function generateProductIdeas(
  category: string,
  priceRange: number,
  trendingOnly?: boolean,
  fastShipping?: boolean
): Promise<InsertProduct[]> {
  try {
    // Default to API call if API key is present
    if (process.env.OPENAI_API_KEY) {
      const priceLabels = ["Muy económico", "Económico", "Medio", "Premium", "Lujo"];
      const priceLabel = priceLabels[priceRange - 1];
      
      const prompt = `
        Genera 5 productos virales para vender online en la categoría de "${category}".
        Los productos deben ser del rango de precio "${priceLabel}".
        ${trendingOnly ? "Los productos deben estar en tendencia actualmente." : ""}
        ${fastShipping ? "Los productos deben tener disponibilidad de envío rápido." : ""}
        
        Para cada producto, proporciona la siguiente información en formato JSON:
        - name: nombre atractivo del producto
        - description: descripción persuasiva (max 150 caracteres)
        - price: precio en euros (€) - adecuado al rango especificado
        - imageUrl: URL de una imagen representativa (deja vacío)
        - rating: calificación entre 1-5 (puede incluir decimales)
        - reviews: número de reseñas
        - trending: si el producto está en tendencia (true/false)
        - viral: si el producto es viral (true/false)
        - popular: si el producto es popular pero no viral o trending (true/false)
        - views: número aproximado de vistas en formato "XXk+"
        - tags: 3 etiquetas relevantes para el producto
        - userId: 1 (usuario por defecto)
        
        Responde con un array JSON de 5 productos sin comentarios adicionales.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("Empty response from OpenAI");
      
      const parsedResponse = JSON.parse(content);
      
      // Add placeholder images for the products
      const productImages = [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
        "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
        "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350"
      ];
      
      return parsedResponse.products.map((product: InsertProduct, index: number) => ({
        ...product,
        imageUrl: product.imageUrl || productImages[index % productImages.length]
      }));
    } else {
      // If no API key is available, return mock data for development
      console.warn("No OpenAI API key found, using fallback product ideas");
      return fallbackProductIdeas(category, priceRange, trendingOnly, fastShipping);
    }
  } catch (error) {
    console.error("Error generating product ideas:", error);
    throw new Error("Failed to generate product ideas. Please try again later.");
  }
}

// Fallback product ideas for development when no API key is available
function fallbackProductIdeas(
  category: string,
  priceRange: number,
  trendingOnly?: boolean,
  fastShipping?: boolean
): InsertProduct[] {
  // These are just for development purposes when API key isn't available
  const productBasicInfo = [
    {
      name: "Organizador Multifuncional para Gadgets",
      description: "Mantén todos tus cables, cargadores y accesorios electrónicos organizados con este elegante estuche resistente al agua.",
      price: "€19.99",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
      tags: ["Tecnología", "Organización", "Unisex"]
    },
    {
      name: "Botella Motivacional con Indicador de Tiempo",
      description: "Mantente hidratado a lo largo del día con esta botella que te recuerda cuándo debes beber agua. Libre de BPA.",
      price: "€24.99",
      imageUrl: "https://pixabay.com/get/ge1501c97962eed23b0a39fe285bfc80f0d7ba3579b28c1a262637be0782034bd7f30aa43ffa072d1cbad2bf58c3fa3d241b6549bd0211da2fb8bcd52f33725e2_1280.jpg",
      tags: ["Fitness", "Ecológico", "Bestseller"]
    },
    {
      name: "Luz LED Inteligente Multicolor",
      description: "Transforma el ambiente de tu hogar con esta luz LED que ofrece 16 millones de colores y control por voz y app.",
      price: "€29.99",
      imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
      tags: ["Smart Home", "Decoración", "WiFi"]
    },
    {
      name: "Alfombrilla de Carga Inalámbrica 3 en 1",
      description: "Carga simultáneamente tu smartphone, smartwatch y auriculares. Diseño elegante y compacto para cualquier espacio.",
      price: "€34.99",
      imageUrl: "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
      tags: ["Tecnología", "Gadgets", "Carga"]
    },
    {
      name: "Proyector de Estrellas con Altavoz Bluetooth",
      description: "Crea un ambiente relajante con este proyector que transforma tu habitación en un cielo estrellado, incluye altavoz integrado.",
      price: "€39.99",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
      tags: ["Hogar", "Relajación", "Tecnología"]
    }
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
      userId: 1
    };
  });
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { generateText, generateProductIdeas } from "./lib/openai";

// Product generation request schema
const productGenerationSchema = z.object({
  category: z.string(),
  priceRange: z.number().min(1).max(5),
  trendingOnly: z.boolean().optional(),
  fastShipping: z.boolean().optional(),
});

// Content generation request schema
const contentGenerationSchema = z.object({
  productId: z.number(),
  contentData: z.object({
    title: z.string(),
    description: z.string(),
    music: z.string(),
    animation: z.string(),
    cta: z.string(),
  }),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Get products for a category
  app.post("/api/products/generate", async (req, res) => {
    try {
      const validatedData = productGenerationSchema.parse(req.body);
      
      // Generate product ideas using OpenAI
      const products = await generateProductIdeas(
        validatedData.category,
        validatedData.priceRange,
        validatedData.trendingOnly,
        validatedData.fastShipping
      );
      
      // Store the generated products
      const savedProducts = await Promise.all(
        products.map(product => storage.createProduct(product))
      );
      
      res.json({ products: savedProducts });
    } catch (error) {
      console.error("Error generating products:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Error generating products" });
    }
  });
  
  // Get recent products
  app.get("/api/products/recent", async (req, res) => {
    try {
      const products = await storage.getRecentProducts();
      res.json({ products });
    } catch (error) {
      console.error("Error fetching recent products:", error);
      res.status(500).json({ message: "Error fetching recent products" });
    }
  });
  
  // Save a product
  app.post("/api/products/:id/save", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.getProduct(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Just return success for now, in a real app we'd associate with the user
      res.json({ success: true, product });
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(500).json({ message: "Error saving product" });
    }
  });
  
  // Generate content for a product
  app.post("/api/content/generate", async (req, res) => {
    try {
      const validatedData = contentGenerationSchema.parse(req.body);
      
      // Get the product to generate content for
      const product = await storage.getProduct(validatedData.productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Generate video URL - in a real app this would create an actual video
      // For demonstration, we'll just simulate this by returning a mock URL
      const videoUrl = `https://example.com/videos/${product.id}-${Date.now()}.mp4`;
      
      // Store the content
      const content = await storage.createContent({
        ...validatedData.contentData,
        videoUrl,
        productId: product.id,
        userId: 1, // Mock user ID for demonstration
      });
      
      res.json({ 
        success: true, 
        videoUrl,
        content
      });
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Error generating content" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

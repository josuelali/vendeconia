import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { generateProductIdeas } from "./lib/openai";
import {
  insertContentSchema,
  insertTemplateSchema,
  insertConsultingServiceSchema,
} from "@shared/schema";

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

// Helper: get userId or fallback to demo user (never 401 in demo endpoints)
function getUserIdOrDemo(req: any) {
  return req?.user?.claims?.sub || "demo_user_1";
}

// Helper: safe number
function toNumber(value: any, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

// Helpers: ensure DB-safe product shape
function safeString(v: any, fallback = ""): string {
  if (typeof v === "string") return v.trim();
  if (v == null) return fallback;
  return String(v).trim();
}

function ensureName(p: any, idx: number): string {
  // Acepta name (ideal) o title (tu fallback viejo) u otros
  const name =
    safeString(p?.name) ||
    safeString(p?.title) ||
    safeString(p?.productName) ||
    safeString(p?.product_title);

  if (name) return name;
  const desc = safeString(p?.description);
  return desc ? `Producto recomendado #${idx + 1}` : `Producto viral #${idx + 1}`;
}

function ensureArrayTags(v: any): string[] {
  if (Array.isArray(v)) {
    return v.map((x) => safeString(x)).filter(Boolean).slice(0, 5);
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

function pickImage(idx: number): string {
  const imgs = [
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=500&h=350",
  ];
  return imgs[idx % imgs.length];
}

/**
 * Normaliza cualquier lista (OpenAI o fallback) a un shape que NO reviente DB.
 * Importante: devuelve objetos con "name" SIEMPRE.
 */
function normalizeForDb(products: any[]): any[] {
  return (products || []).slice(0, 5).map((p: any, idx: number) => {
    const trending = typeof p?.trending === "boolean" ? p.trending : idx % 2 === 0;
    const viral = typeof p?.viral === "boolean" ? p.viral : idx === 1;
    const popular =
      typeof p?.popular === "boolean" ? p.popular : !trending && !viral;

    const out: any = {
      // ✅ clave: name nunca null
      name: ensureName(p, idx),
      description: safeString(p?.description, "Producto recomendado para ti."),
      price: safeString(p?.price, "€19.99"),
      imageUrl: safeString(p?.imageUrl) || pickImage(idx),
      rating: Number.isFinite(Number(p?.rating)) ? Number(p.rating) : 4.5,
      reviews: Number.isFinite(Number(p?.reviews)) ? Math.max(0, Math.floor(Number(p.reviews))) : 300,
      trending,
      viral,
      popular,
      views: safeString(p?.views, `${10 + idx * 5}k+`),
      tags: ensureArrayTags(p?.tags),
    };

    // Seguro extra
    if (!out.name) out.name = `Producto viral #${idx + 1}`;
    if (!out.imageUrl) out.imageUrl = pickImage(idx);

    return out;
  });
}

// Helper: fallback products if OpenAI fails (YA con name, no title)
function fallbackProducts(category?: string) {
  const cat = category || "General";
  return [
    {
      name: "Soporte plegable para portátil",
      description:
        "Ajustable, ligero y perfecto para mejorar postura y productividad.",
      price: "15€ - 30€",
      imageUrl: pickImage(0),
      rating: 4.6,
      reviews: 820,
      trending: true,
      viral: false,
      popular: true,
      views: "25k+",
      tags: ["Oficina", "Postura", "Setup"],
    },
    {
      name: "Mini aspirador inalámbrico para coche y teclado",
      description: "Compacto, potente y muy útil para limpieza rápida diaria.",
      price: "20€ - 45€",
      imageUrl: pickImage(1),
      rating: 4.5,
      reviews: 540,
      trending: false,
      viral: true,
      popular: false,
      views: "60k+",
      tags: ["Limpieza", "Coche", "Gadgets"],
    },
    {
      name: "Luz LED con sensor de movimiento",
      description:
        "Se enciende sola al pasar. Ideal para armarios, pasillos y escaleras.",
      price: "12€ - 25€",
      imageUrl: pickImage(2),
      rating: 4.7,
      reviews: 1200,
      trending: true,
      viral: false,
      popular: true,
      views: "40k+",
      tags: ["Hogar", "LED", "Ahorro"],
    },
  ];
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize authentication
  await setupAuth(app);

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Product generation routes (public OK)
  app.post("/api/generate-products", async (req: any, res) => {
    try {
      const userId = getUserIdOrDemo(req);

      const body = req.body || {};
      const category = body.category || "";
      const priceRange = toNumber(body.priceRange, 3);
      const fastShipping =
        typeof body.fastShipping === "boolean" ? body.fastShipping : true;

      const useTrendingOnly =
        typeof body.trendingOnly === "boolean"
          ? body.trendingOnly
          : !!body.trending;

      let products: any[] = [];
      try {
        products = await generateProductIdeas(
          category,
          priceRange,
          useTrendingOnly,
          fastShipping,
        );
      } catch (e: any) {
        console.error(
          "generateProductIdeas failed (api/generate-products). Using fallback:",
          e?.message || e,
        );
        products = fallbackProducts(category);
      }

      // ✅ normaliza SIEMPRE (OpenAI o fallback)
      const normalized = normalizeForDb(products);

      // ✅ guarda de forma segura: si uno falla, no tumba todo
      const savedProducts = await Promise.all(
        normalized.map(async (product: any, idx: number) => {
          try {
            const safe = { ...product, userId, name: ensureName(product, idx) };
            return await storage.createProduct(safe);
          } catch (err) {
            console.error("createProduct failed, skipping item:", err);
            return null;
          }
        }),
      );

      const filtered = savedProducts.filter(Boolean);
      return res.json({ products: filtered });
    } catch (error) {
      console.error("Error generating products:", error);
      res.status(500).json({ message: "Error generating products" });
    }
  });

  // Main endpoint used by your frontend (public OK)
  app.post("/api/products/generate", async (req: any, res) => {
    try {
      const userId = getUserIdOrDemo(req);

      const body = req.body || {};
      const category = body.category || "";
      const priceRange = toNumber(body.priceRange, 3);
      const fastShipping =
        typeof body.fastShipping === "boolean" ? body.fastShipping : true;
      const trendingOnly =
        typeof body.trendingOnly === "boolean" ? body.trendingOnly : false;

      let products: any[] = [];
      try {
        products = await generateProductIdeas(
          category,
          priceRange,
          trendingOnly,
          fastShipping,
        );
      } catch (e: any) {
        console.error(
          "generateProductIdeas failed (/api/products/generate). Using fallback:",
          e?.message || e,
        );
        products = fallbackProducts(category);
      }

      // ✅ normaliza SIEMPRE
      const normalized = normalizeForDb(products);

      // ✅ guarda sin tumbar todo si uno falla
      const savedProducts = await Promise.all(
        normalized.map(async (product: any, idx: number) => {
          try {
            const safe = { ...product, userId, name: ensureName(product, idx) };
            return await storage.createProduct(safe);
          } catch (err) {
            console.error("createProduct failed, skipping item:", err);
            return null;
          }
        }),
      );

      const filtered = savedProducts.filter(Boolean);

      // ✅ si por lo que sea no guardó ninguno, aún así responde 200 con fallback normalizado
      if (!filtered.length) {
        return res.json({ products: normalized.map((p) => ({ ...p, userId })) });
      }

      res.json({ products: filtered });
    } catch (error) {
      console.error("Error generating products:", error);
      res.status(500).json({ message: "Error generating products" });
    }
  });

  app.get("/api/products/recent", async (_req, res) => {
    try {
      const products = await storage.getRecentProducts(20);
      res.json({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
    }
  });

  // Content generation routes (public OK in your demo flow)
  app.post("/api/content/generate", async (req: any, res) => {
    try {
      const userId = getUserIdOrDemo(req);
      const { productId, contentData } = req.body || {};

      const videoUrl = `https://example.com/video/${Date.now()}.mp4`;

      const content = await storage.createContent({
        userId,
        productId,
        title: contentData?.title,
        description: contentData?.description,
        music: contentData?.music,
        animation: contentData?.animation,
        cta: contentData?.cta,
        videoUrl,
      });

      res.json({ videoUrl, content });
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({ message: "Error generating content" });
    }
  });

  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getRecentProducts(20);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
    }
  });

  app.get("/api/products/user", async (req: any, res) => {
    try {
      const userId = getUserIdOrDemo(req);
      const products = await storage.getUserProducts(userId, 50);
      res.json(products);
    } catch (error) {
      console.error("Error fetching user products:", error);
      res.status(500).json({ message: "Error fetching user products" });
    }
  });

  // Protected content generation (kept as-is)
  app.post("/api/generate-content", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (
        user?.subscriptionPlan === "free" &&
        (user.monthlyContentGenerations || 0) >= 5
      ) {
        return res.status(403).json({
          message: "Límite de generaciones gratuitas alcanzado. Mejora tu plan.",
        });
      }

      const contentData = insertContentSchema.parse(req.body);
      const content = await storage.createContent({ ...contentData, userId });

      await storage.trackUserUsage(userId, "content");

      res.json(content);
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({ message: "Error generating content" });
    }
  });

  app.get("/api/contents/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const contents = await storage.getUserContents(userId, 50);
      res.json(contents);
    } catch (error) {
      console.error("Error fetching user contents:", error);
      res.status(500).json({ message: "Error fetching user contents" });
    }
  });

  // Subscription and billing routes
  app.get("/api/subscription-plans", async (_req, res) => {
    try {
      const plans = await storage.getSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({ message: "Error fetching subscription plans" });
    }
  });

  app.post("/api/create-subscription", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { planId } = req.body;

      let user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (user.stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(
          user.stripeSubscriptionId,
        );
        if (subscription.status === "active") {
          const invoice = subscription.latest_invoice as any;
          const paymentIntent = typeof invoice === 'object' && invoice ? invoice.payment_intent : null;
          const clientSecret = typeof paymentIntent === 'object' && paymentIntent ? paymentIntent.client_secret : null;
          return res.json({
            subscriptionId: subscription.id,
            clientSecret,
          });
        }
      }

      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          name: `${user.firstName} ${user.lastName}`.trim() || undefined,
        });
        customerId = customer.id;
        user = await storage.updateUserStripeInfo(userId, customerId, "");
      }

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: planId }],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
      });

      await storage.updateUserStripeInfo(userId, customerId, subscription.id);

      const newInvoice = subscription.latest_invoice as any;
      const newPaymentIntent = typeof newInvoice === 'object' && newInvoice ? newInvoice.payment_intent : null;
      const newClientSecret = typeof newPaymentIntent === 'object' && newPaymentIntent ? newPaymentIntent.client_secret : null;
      res.json({
        subscriptionId: subscription.id,
        clientSecret: newClientSecret,
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Error creating subscription" });
    }
  });

  // Template marketplace routes
  app.get("/api/templates", async (req, res) => {
    try {
      const { category } = req.query;
      const templates = await storage.getTemplates(category as string);
      res.json(templates);
    } catch (error) {
      console.error("Error fetching templates:", error);
      res.status(500).json({ message: "Error fetching templates" });
    }
  });

  app.post("/api/templates", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const templateData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate({
        ...templateData,
        creatorId: userId,
      });
      res.json(template);
    } catch (error) {
      console.error("Error creating template:", error);
      res.status(500).json({ message: "Error creating template" });
    }
  });

  app.get("/api/templates/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const templates = await storage.getUserTemplates(userId);
      res.json(templates);
    } catch (error) {
      console.error("Error fetching user templates:", error);
      res.status(500).json({ message: "Error fetching user templates" });
    }
  });

  app.post("/api/templates/:id/purchase", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const templateId = parseInt(req.params.id);
      const { price } = req.body;

      const purchase = await storage.purchaseTemplate(userId, templateId, price);
      res.json(purchase);
    } catch (error) {
      console.error("Error purchasing template:", error);
      res.status(500).json({ message: "Error purchasing template" });
    }
  });

  // Stripe webhook handler
  app.post("/api/stripe/webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: any;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig as any,
        endpointSecret as any,
      );
    } catch (err: any) {
      console.log("Webhook signature verification failed.", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case "invoice.payment_succeeded": {
          const invoice = event.data.object;
          const subscriptionId = invoice.subscription;
          const customerId = invoice.customer;

          const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
          await stripe.customers.retrieve(customerId);

          const users = await storage.getUserByStripeCustomerId(customerId);
          if (users.length > 0) {
            const user = users[0];
            const planName = subscription.items.data[0].price.nickname || "premium";
            const endsAt = new Date(subscription.current_period_end * 1000);

            await storage.updateUserSubscription(user.id, planName, endsAt);
            console.log(`✅ Subscription activated for user ${user.id}: ${planName}`);
          }
          break;
        }

        case "customer.subscription.deleted": {
          const deletedSubscription = event.data.object;
          const deletedCustomerId = deletedSubscription.customer;

          const deletedUsers = await storage.getUserByStripeCustomerId(deletedCustomerId);
          if (deletedUsers.length > 0) {
            const user = deletedUsers[0];
            await storage.updateUserSubscription(user.id, "free");
            console.log(`❌ Subscription cancelled for user ${user.id}`);
          }
          break;
        }

        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.error("Error processing webhook:", error);
      return res.status(500).json({ message: "Webhook processing failed" });
    }

    res.json({ received: true });
  });

  // Billing portal
  app.post("/api/billing-portal", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user?.stripeCustomerId) {
        return res
          .status(400)
          .json({ message: "No hay información de facturación disponible" });
      }

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${req.protocol}://${req.get("host")}/dashboard`,
      });

      res.json({ url: portalSession.url });
    } catch (error) {
      console.error("Error creating billing portal session:", error);
      res.status(500).json({ message: "Error accessing billing portal" });
    }
  });

  // Affiliate tracking routes
  app.post("/api/affiliate/track", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { productId, type, amount } = req.body;

      const transaction = await storage.trackAffiliateTransaction(
        userId,
        productId,
        type,
        amount,
      );
      res.json(transaction);
    } catch (error) {
      console.error("Error tracking affiliate transaction:", error);
      res.status(500).json({ message: "Error tracking affiliate transaction" });
    }
  });

  app.get("/api/affiliate/earnings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const earnings = await storage.getUserAffiliateEarnings(userId);
      res.json({ earnings });
    } catch (error) {
      console.error("Error fetching affiliate earnings:", error);
      res.status(500).json({ message: "Error fetching affiliate earnings" });
    }
  });

  // Consulting services routes
  app.get("/api/consulting", async (_req, res) => {
    try {
      const services = await storage.getConsultingServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching consulting services:", error);
      res.status(500).json({ message: "Error fetching consulting services" });
    }
  });

  app.post("/api/consulting", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const serviceData = insertConsultingServiceSchema.parse(req.body);
      const service = await storage.createConsultingService({
        ...serviceData,
        consultantId: userId,
      });
      res.json(service);
    } catch (error) {
      console.error("Error creating consulting service:", error);
      res.status(500).json({ message: "Error creating consulting service" });
    }
  });

  app.get("/api/consulting/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const services = await storage.getConsultingServices(userId);
      res.json(services);
    } catch (error) {
      console.error("Error fetching consulting services:", error);
      res.status(500).json({ message: "Error fetching consulting services" });
    }
  });

  app.patch("/api/consulting/:id/status", isAuthenticated, async (req: any, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const { status } = req.body;

      const service = await storage.updateConsultingServiceStatus(serviceId, status);
      res.json(service);
    } catch (error) {
      console.error("Error updating consulting service status:", error);
      res.status(500).json({ message: "Error updating consulting service status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}


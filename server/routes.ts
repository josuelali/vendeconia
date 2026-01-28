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
  apiVersion: "2023-10-16",
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

// Helper: fallback products if OpenAI fails
function fallbackProducts(category?: string) {
  const cat = category || "General";
  return [
    {
      title: "Soporte plegable para portátil",
      description:
        "Ajustable, ligero y perfecto para mejorar postura y productividad.",
      category: cat,
      price: "15€ - 30€",
      whyItSells: "Teletrabajo + mejora postura + demostrable en vídeo.",
      targetAudience: "Estudiantes, oficina, creadores",
      viralAngle: "Antes/después del setup",
    },
    {
      title: "Mini aspirador inalámbrico para coche y teclado",
      description: "Compacto, potente y muy útil para limpieza rápida diaria.",
      category: cat,
      price: "20€ - 45€",
      whyItSells: "Soluciona un dolor cotidiano con efecto 'satisfying'.",
      targetAudience: "Conductores, gamers, hogar",
      viralAngle: "Limpieza ASMR / satisfying",
    },
    {
      title: "Luz LED con sensor de movimiento",
      description:
        "Se enciende sola al pasar. Ideal para armarios, pasillos y escaleras.",
      category: cat,
      price: "12€ - 25€",
      whyItSells: "Barata, útil, instalación fácil, perfecta para reels.",
      targetAudience: "Familias, alquiler, hogar",
      viralAngle: "Instalación en 10 segundos",
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

      const savedProducts = await Promise.all(
        products.map((product: any) =>
          storage.createProduct({ ...product, userId }),
        ),
      );

      res.json({ products: savedProducts });
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

      const savedProducts = await Promise.all(
        products.map((product: any) =>
          storage.createProduct({ ...product, userId }),
        ),
      );

      res.json({ products: savedProducts });
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
          message:
            "Límite de generaciones gratuitas alcanzado. Mejora tu plan.",
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

  app.post(
    "/api/create-subscription",
    isAuthenticated,
    async (req: any, res) => {
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
            return res.json({
              subscriptionId: subscription.id,
              clientSecret:
                subscription.latest_invoice?.payment_intent?.client_secret,
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

        res.json({
          subscriptionId: subscription.id,
          clientSecret:
            subscription.latest_invoice?.payment_intent?.client_secret,
        });
      } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({ message: "Error creating subscription" });
      }
    },
  );

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

  app.post(
    "/api/templates/:id/purchase",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const templateId = parseInt(req.params.id);
        const { price } = req.body;

        const purchase = await storage.purchaseTemplate(
          userId,
          templateId,
          price,
        );
        res.json(purchase);
      } catch (error) {
        console.error("Error purchasing template:", error);
        res.status(500).json({ message: "Error purchasing template" });
      }
    },
  );

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

          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId);
          await stripe.customers.retrieve(customerId);

          const users = await storage.getUserByStripeCustomerId(customerId);
          if (users.length > 0) {
            const user = users[0];
            const planName =
              subscription.items.data[0].price.nickname || "premium";
            const endsAt = new Date(subscription.current_period_end * 1000);

            await storage.updateUserSubscription(user.id, planName, endsAt);
            console.log(
              `✅ Subscription activated for user ${user.id}: ${planName}`,
            );
          }
          break;
        }

        case "customer.subscription.deleted": {
          const deletedSubscription = event.data.object;
          const deletedCustomerId = deletedSubscription.customer;

          const deletedUsers =
            await storage.getUserByStripeCustomerId(deletedCustomerId);
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

  app.patch(
    "/api/consulting/:id/status",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const serviceId = parseInt(req.params.id);
        const { status } = req.body;

        const service = await storage.updateConsultingServiceStatus(
          serviceId,
          status,
        );
        res.json(service);
      } catch (error) {
        console.error("Error updating consulting service status:", error);
        res
          .status(500)
          .json({ message: "Error updating consulting service status" });
      }
    },
  );

  const httpServer = createServer(app);
  return httpServer;
}

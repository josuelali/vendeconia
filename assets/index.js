var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import Stripe from "stripe";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  affiliateTransactions: () => affiliateTransactions,
  consultingServices: () => consultingServices,
  contents: () => contents,
  insertConsultingServiceSchema: () => insertConsultingServiceSchema,
  insertContentSchema: () => insertContentSchema,
  insertProductSchema: () => insertProductSchema,
  insertTemplateSchema: () => insertTemplateSchema,
  insertUserSchema: () => insertUserSchema,
  products: () => products,
  sessions: () => sessions,
  subscriptionPlans: () => subscriptionPlans,
  templatePurchases: () => templatePurchases,
  templates: () => templates,
  upsertUserSchema: () => upsertUserSchema,
  users: () => users
});
import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  doublePrecision,
  timestamp,
  varchar,
  jsonb,
  index,
  real
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  // Subscription fields
  subscriptionPlan: varchar("subscription_plan").default("free"),
  // free, premium, enterprise
  subscriptionStatus: varchar("subscription_status").default("active"),
  subscriptionEndsAt: timestamp("subscription_ends_at"),
  // Stripe fields
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  // Usage tracking
  monthlyProductGenerations: integer("monthly_product_generations").default(0),
  monthlyContentGenerations: integer("monthly_content_generations").default(0),
  lastResetDate: timestamp("last_reset_date").defaultNow(),
  // Affiliate tracking
  affiliateCode: varchar("affiliate_code").unique(),
  affiliateEarnings: real("affiliate_earnings").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: doublePrecision("rating"),
  reviews: integer("reviews"),
  trending: boolean("trending").default(false),
  viral: boolean("viral").default(false),
  popular: boolean("popular").default(false),
  views: text("views"),
  tags: text("tags").array(),
  // Affiliate tracking
  affiliateUrl: text("affiliate_url"),
  commission: real("commission").default(0),
  supplier: text("supplier"),
  supplierUrl: text("supplier_url"),
  createdAt: timestamp("created_at").defaultNow()
});
var contents = pgTable("contents", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  productId: integer("product_id").references(() => products.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  music: text("music").notNull(),
  animation: text("animation").notNull(),
  cta: text("cta").notNull(),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at").defaultNow()
});
var templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  creatorId: varchar("creator_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  price: real("price").notNull(),
  previewUrl: text("preview_url"),
  templateData: jsonb("template_data").notNull(),
  downloads: integer("downloads").default(0),
  rating: real("rating").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var templatePurchases = pgTable("template_purchases", {
  id: serial("id").primaryKey(),
  buyerId: varchar("buyer_id").references(() => users.id),
  templateId: integer("template_id").references(() => templates.id),
  price: real("price").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var affiliateTransactions = pgTable("affiliate_transactions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  productId: integer("product_id").references(() => products.id),
  transactionType: varchar("transaction_type").notNull(),
  // product_click, purchase, commission
  amount: real("amount").default(0),
  currency: varchar("currency").default("EUR"),
  externalTransactionId: text("external_transaction_id"),
  createdAt: timestamp("created_at").defaultNow()
});
var consultingServices = pgTable("consulting_services", {
  id: serial("id").primaryKey(),
  consultantId: varchar("consultant_id").references(() => users.id),
  clientId: varchar("client_id").references(() => users.id),
  serviceType: varchar("service_type").notNull(),
  // store_setup, marketing_strategy, product_research
  price: real("price").notNull(),
  status: varchar("status").default("pending"),
  // pending, in_progress, completed, cancelled
  description: text("description"),
  scheduledAt: timestamp("scheduled_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow()
});
var subscriptionPlans = pgTable("subscription_plans", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  currency: varchar("currency").default("EUR"),
  interval: varchar("interval").default("month"),
  // month, year
  features: jsonb("features").notNull(),
  stripePriceId: varchar("stripe_price_id"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true
});
var upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true
});
var insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  rating: true,
  reviews: true,
  trending: true,
  viral: true,
  popular: true,
  views: true,
  tags: true,
  affiliateUrl: true,
  commission: true,
  supplier: true,
  supplierUrl: true
});
var insertContentSchema = createInsertSchema(contents).pick({
  productId: true,
  title: true,
  description: true,
  music: true,
  animation: true,
  cta: true,
  videoUrl: true
});
var insertTemplateSchema = createInsertSchema(templates).pick({
  name: true,
  description: true,
  category: true,
  price: true,
  previewUrl: true,
  templateData: true
});
var insertConsultingServiceSchema = createInsertSchema(consultingServices).pick({
  clientId: true,
  serviceType: true,
  price: true,
  description: true,
  scheduledAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc, and } from "drizzle-orm";
function cleanStr(v, fallback = "") {
  if (typeof v === "string") return v.trim();
  if (v == null) return fallback;
  return String(v).trim();
}
function toBool(v, fallback = false) {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string")
    return ["true", "1", "yes", "si"].includes(v.toLowerCase());
  return fallback;
}
function toNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function ensurePrice(v) {
  const s = cleanStr(v);
  return s ? s : "\u20AC19.99";
}
function ensureName(v) {
  const s = cleanStr(v);
  return s ? s : "Producto recomendado";
}
function ensureDescription(v) {
  const s = cleanStr(v);
  return s ? s.slice(0, 150) : "Producto recomendado para vender online.";
}
function ensureTags(v) {
  if (Array.isArray(v))
    return v.map((x) => cleanStr(x)).filter(Boolean).slice(0, 5);
  if (typeof v === "string")
    return v.split(",").map((x) => x.trim()).filter(Boolean).slice(0, 5);
  return [];
}
function ensureViews(v) {
  const s = cleanStr(v);
  return s ? s : "10k+";
}
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByStripeCustomerId(stripeCustomerId) {
    return db.select().from(users).where(eq(users.stripeCustomerId, stripeCustomerId));
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values({
      ...userData,
      affiliateCode: userData.id ? `VCA${userData.id.slice(-6)}` : void 0
    }).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async updateUserSubscription(userId, plan, endsAt) {
    const [user] = await db.update(users).set({
      subscriptionPlan: plan,
      subscriptionEndsAt: endsAt,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, userId)).returning();
    return user;
  }
  async updateUserStripeInfo(userId, stripeCustomerId, stripeSubscriptionId) {
    const [user] = await db.update(users).set({
      stripeCustomerId,
      stripeSubscriptionId,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, userId)).returning();
    return user;
  }
  async trackUserUsage(userId, type) {
    const user = await this.getUser(userId);
    if (!user) return;
    const now = /* @__PURE__ */ new Date();
    const lastReset = user.lastResetDate || /* @__PURE__ */ new Date();
    const shouldReset = now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear();
    if (shouldReset) {
      await this.resetUserUsage(userId);
    }
    const currentProduct = user.monthlyProductGenerations || 0;
    const currentContent = user.monthlyContentGenerations || 0;
    if (type === "product") {
      await db.update(users).set({ monthlyProductGenerations: currentProduct + 1 }).where(eq(users.id, userId));
    } else {
      await db.update(users).set({ monthlyContentGenerations: currentContent + 1 }).where(eq(users.id, userId));
    }
  }
  async resetUserUsage(userId) {
    await db.update(users).set({
      monthlyProductGenerations: 0,
      monthlyContentGenerations: 0,
      lastResetDate: /* @__PURE__ */ new Date()
    }).where(eq(users.id, userId));
  }
  // Product methods
  async getProduct(id) {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  async getRecentProducts(limit = 10) {
    return db.select().from(products).orderBy(desc(products.createdAt)).limit(limit);
  }
  async getUserProducts(userId, limit = 10) {
    return db.select().from(products).where(eq(products.userId, userId)).orderBy(desc(products.createdAt)).limit(limit);
  }
  async createProduct(productData) {
    const safe = {
      ...productData,
      userId: cleanStr(productData.userId, "demo_user_1"),
      name: ensureName(productData.name),
      description: ensureDescription(productData.description),
      price: ensurePrice(productData.price),
      imageUrl: cleanStr(productData.imageUrl, null),
      rating: Math.max(
        0,
        Math.min(5, toNumber(productData.rating, 4.5))
      ),
      reviews: Math.max(
        0,
        Math.floor(toNumber(productData.reviews, 300))
      ),
      trending: toBool(productData.trending, false),
      viral: toBool(productData.viral, false),
      popular: toBool(productData.popular, false),
      views: ensureViews(productData.views),
      tags: ensureTags(productData.tags)
    };
    if (!safe.trending && !safe.viral) safe.popular = true;
    const [product] = await db.insert(products).values(safe).returning();
    return product;
  }
  // Content methods
  async getContent(id) {
    const [content] = await db.select().from(contents).where(eq(contents.id, id));
    return content;
  }
  async getContentByProduct(productId) {
    return db.select().from(contents).where(eq(contents.productId, productId)).orderBy(desc(contents.createdAt));
  }
  async getUserContents(userId, limit = 10) {
    return db.select().from(contents).where(eq(contents.userId, userId)).orderBy(desc(contents.createdAt)).limit(limit);
  }
  async createContent(contentData) {
    const [content] = await db.insert(contents).values(contentData).returning();
    return content;
  }
  // Template marketplace methods
  async getTemplate(id) {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template;
  }
  async getTemplates(category, limit = 20) {
    if (category) {
      return db.select().from(templates).where(and(eq(templates.isActive, true), eq(templates.category, category))).orderBy(desc(templates.downloads)).limit(limit);
    }
    return db.select().from(templates).where(eq(templates.isActive, true)).orderBy(desc(templates.downloads)).limit(limit);
  }
  async getUserTemplates(userId) {
    return db.select().from(templates).where(eq(templates.creatorId, userId)).orderBy(desc(templates.createdAt));
  }
  async createTemplate(templateData) {
    const [template] = await db.insert(templates).values(templateData).returning();
    return template;
  }
  async purchaseTemplate(buyerId, templateId, price) {
    const [purchase] = await db.insert(templatePurchases).values({ buyerId, templateId, price }).returning();
    const [t] = await db.select({ downloads: templates.downloads }).from(templates).where(eq(templates.id, templateId));
    await db.update(templates).set({ downloads: (t?.downloads || 0) + 1 }).where(eq(templates.id, templateId));
    return purchase;
  }
  // Affiliate methods
  async trackAffiliateTransaction(userId, productId, type, amount) {
    const [transaction] = await db.insert(affiliateTransactions).values({
      userId,
      productId,
      transactionType: type,
      amount
    }).returning();
    if (type === "commission") {
      const user = await this.getUser(userId);
      const current = user?.affiliateEarnings || 0;
      await db.update(users).set({ affiliateEarnings: current + amount }).where(eq(users.id, userId));
    }
    return transaction;
  }
  async getUserAffiliateEarnings(userId) {
    const user = await this.getUser(userId);
    return user?.affiliateEarnings || 0;
  }
  // Consulting methods
  async getConsultingServices(userId) {
    if (userId) {
      return db.select().from(consultingServices).where(eq(consultingServices.clientId, userId)).orderBy(desc(consultingServices.createdAt));
    }
    return db.select().from(consultingServices).orderBy(desc(consultingServices.createdAt));
  }
  async createConsultingService(serviceData) {
    const [service] = await db.insert(consultingServices).values(serviceData).returning();
    return service;
  }
  async updateConsultingServiceStatus(serviceId, status) {
    const [service] = await db.update(consultingServices).set({
      status,
      ...status === "completed" ? { completedAt: /* @__PURE__ */ new Date() } : {}
    }).where(eq(consultingServices.id, serviceId)).returning();
    return service;
  }
  // Subscription plans
  async getSubscriptionPlans() {
    return db.select().from(subscriptionPlans).where(eq(subscriptionPlans.isActive, true)).orderBy(subscriptionPlans.price);
  }
};
var storage = new DatabaseStorage();

// server/replitAuth.ts
import * as client from "openid-client";
import { Strategy } from "openid-client/passport";
import passport from "passport";
import session from "express-session";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}
var getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID
    );
  },
  { maxAge: 3600 * 1e3 }
);
function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions"
  });
  return session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl
    }
  });
}
function updateUserSession(user, tokens) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}
async function upsertUser(claims) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"]
  });
}
async function setupAuth(app2) {
  app2.set("trust proxy", 1);
  app2.use(getSession());
  app2.use(passport.initialize());
  app2.use(passport.session());
  const config = await getOidcConfig();
  const verify = async (tokens, verified) => {
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(tokens.claims());
    verified(null, user);
  };
  for (const domain of process.env.REPLIT_DOMAINS.split(",")) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`
      },
      verify
    );
    passport.use(strategy);
  }
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((user, cb) => cb(null, user));
  app2.get("/api/login", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"]
    })(req, res, next);
  });
  app2.get("/api/callback", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login"
    })(req, res, next);
  });
  app2.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`
        }).href
      );
    });
  });
}
var isAuthenticated = async (req, res, next) => {
  const user = req.user;
  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const now = Math.floor(Date.now() / 1e3);
  if (now <= user.expires_at) {
    return next();
  }
  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

// server/lib/openai.ts
import OpenAI from "openai";
function getOpenAIClient() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}
function safeString(v, fallback = "") {
  if (typeof v === "string") return v.trim();
  if (v == null) return fallback;
  return String(v).trim();
}
function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function ensureTags2(v) {
  if (Array.isArray(v)) {
    return v.map((x) => safeString(x)).filter(Boolean).slice(0, 5);
  }
  if (typeof v === "string") {
    return v.split(",").map((x) => x.trim()).filter(Boolean).slice(0, 5);
  }
  return [];
}
function ensureViews2(v, idx) {
  const s = safeString(v);
  return s || `${10 + idx * 5}k+`;
}
function ensureName2(p, idx) {
  const name = safeString(p?.name) || safeString(p?.title) || safeString(p?.productName);
  if (name) return name;
  const desc2 = safeString(p?.description);
  if (desc2) return `Producto recomendado #${idx + 1}`;
  return `Producto viral #${idx + 1}`;
}
function pickImage(idx) {
  const productImages = [
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=500&h=350"
  ];
  return productImages[idx % productImages.length];
}
function normalizeProducts(raw) {
  const arr = Array.isArray(raw) ? raw : Array.isArray(raw?.products) ? raw.products : [];
  return arr.slice(0, 5).map((p, idx) => {
    const trending = typeof p?.trending === "boolean" ? p.trending : idx % 2 === 0;
    const viral = typeof p?.viral === "boolean" ? p.viral : idx === 1;
    const popular = typeof p?.popular === "boolean" ? p.popular : !trending && !viral;
    const out = {
      name: ensureName2(p, idx),
      description: safeString(p?.description, "Producto recomendado para ti."),
      price: safeString(p?.price, "\u20AC19.99"),
      imageUrl: safeString(p?.imageUrl) || pickImage(idx),
      rating: safeNumber(p?.rating, 4.5),
      reviews: Math.max(0, Math.floor(safeNumber(p?.reviews, 300))),
      trending,
      viral,
      popular,
      views: ensureViews2(p?.views, idx),
      tags: ensureTags2(p?.tags)
      // NO userId aquí (lo añade routes.ts al guardar)
    };
    if (!out.name) out.name = `Producto viral #${idx + 1}`;
    if (!out.description) out.description = "Producto recomendado para ti.";
    if (!out.price) out.price = "\u20AC19.99";
    if (!out.imageUrl) out.imageUrl = pickImage(idx);
    return out;
  });
}
async function generateProductIdeas(category, priceRange, trendingOnly, fastShipping) {
  const priceLabels = [
    "Muy econ\xF3mico",
    "Econ\xF3mico",
    "Medio",
    "Premium",
    "Lujo"
  ];
  const idx = Math.max(0, Math.min(4, (priceRange || 3) - 1));
  const priceLabel = priceLabels[idx];
  const client2 = getOpenAIClient();
  if (!client2) {
    console.warn("No OpenAI API key found, using fallback product ideas");
    return fallbackProductIdeas(
      category,
      priceRange,
      trendingOnly,
      fastShipping
    );
  }
  try {
    const prompt = `
Genera 5 productos virales para vender online en la categor\xEDa: "${category}".
Rango de precio: "${priceLabel}".
${trendingOnly ? "Deben estar en tendencia actualmente." : ""}
${fastShipping ? "Deben poder enviarse r\xE1pido." : ""}

Devuelve \xDANICAMENTE un JSON con esta forma EXACTA:
{
  "products": [
    {
      "name": "string",
      "description": "string (max 150 caracteres)",
      "price": "string con \u20AC (ej: \u20AC19.99 o \u20AC12 - \u20AC25)",
      "imageUrl": "string (puede ir vac\xEDo)",
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
    const response = await client2.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });
    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response from OpenAI");
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error(
        "OpenAI returned non-JSON content, using fallback:",
        content
      );
      return fallbackProductIdeas(
        category,
        priceRange,
        trendingOnly,
        fastShipping
      );
    }
    const normalized = normalizeProducts(parsed);
    if (!normalized.length) {
      return fallbackProductIdeas(
        category,
        priceRange,
        trendingOnly,
        fastShipping
      );
    }
    return normalized;
  } catch (error) {
    console.error(
      "OpenAI failed, using fallback:",
      error?.status || error?.message || error
    );
    return fallbackProductIdeas(
      category,
      priceRange,
      trendingOnly,
      fastShipping
    );
  }
}
function fallbackProductIdeas(category, priceRange, trendingOnly, fastShipping) {
  const productBasicInfo = [
    {
      name: "Organizador Multifuncional para Gadgets",
      description: "Mant\xE9n cables y accesorios organizados con este estuche resistente al agua.",
      price: "\u20AC19.99",
      imageUrl: pickImage(0),
      tags: ["Tecnolog\xEDa", "Organizaci\xF3n", "Unisex"]
    },
    {
      name: "Botella Motivacional con Indicador de Tiempo",
      description: "Botella que te recuerda cu\xE1ndo beber agua. Libre de BPA.",
      price: "\u20AC24.99",
      imageUrl: pickImage(1),
      tags: ["Fitness", "Ecol\xF3gico", "Bestseller"]
    },
    {
      name: "Luz LED Inteligente Multicolor",
      description: "Luz LED con millones de colores y control por app.",
      price: "\u20AC29.99",
      imageUrl: pickImage(2),
      tags: ["Smart Home", "Decoraci\xF3n", "WiFi"]
    },
    {
      name: "Alfombrilla de Carga Inal\xE1mbrica 3 en 1",
      description: "Carga m\xF3vil, reloj y auriculares a la vez. Compacta y elegante.",
      price: "\u20AC34.99",
      imageUrl: pickImage(3),
      tags: ["Tecnolog\xEDa", "Gadgets", "Carga"]
    },
    {
      name: "Proyector de Estrellas con Altavoz Bluetooth",
      description: "Convierte tu habitaci\xF3n en un cielo estrellado con m\xFAsica.",
      price: "\u20AC39.99",
      imageUrl: pickImage(4),
      tags: ["Hogar", "Relajaci\xF3n", "Tecnolog\xEDa"]
    }
  ];
  return productBasicInfo.map((basicInfo, index2) => {
    const isTrending = trendingOnly ? true : index2 % 2 === 0;
    const isViral = index2 === 1;
    const isPopular = !isTrending && !isViral;
    const out = {
      ...basicInfo,
      rating: 4 + index2 % 2 * 0.5,
      reviews: 300 + index2 * 100,
      trending: isTrending,
      viral: isViral,
      popular: isPopular,
      views: `${10 + index2 * 5}k+`,
      tags: ensureTags2(basicInfo.tags)
    };
    if (!out.name) out.name = `Producto viral #${index2 + 1}`;
    if (!out.description) out.description = "Producto recomendado para ti.";
    if (!out.price) out.price = "\u20AC19.99";
    if (!out.imageUrl) out.imageUrl = pickImage(index2);
    return out;
  });
}

// server/routes.ts
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");
}
var stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil"
});
function getUserIdOrDemo(req) {
  return req?.user?.claims?.sub || "demo_user_1";
}
function toNumber2(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}
function safeString2(v, fallback = "") {
  if (typeof v === "string") return v.trim();
  if (v == null) return fallback;
  return String(v).trim();
}
function ensureName3(p, idx) {
  const name = safeString2(p?.name) || safeString2(p?.title) || safeString2(p?.productName) || safeString2(p?.product_title);
  if (name) return name;
  const desc2 = safeString2(p?.description);
  return desc2 ? `Producto recomendado #${idx + 1}` : `Producto viral #${idx + 1}`;
}
function ensureArrayTags(v) {
  if (Array.isArray(v)) {
    return v.map((x) => safeString2(x)).filter(Boolean).slice(0, 5);
  }
  if (typeof v === "string") {
    return v.split(",").map((x) => x.trim()).filter(Boolean).slice(0, 5);
  }
  return [];
}
function pickImage2(idx) {
  const imgs = [
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&h=350",
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=500&h=350"
  ];
  return imgs[idx % imgs.length];
}
function normalizeForDb(products2) {
  return (products2 || []).slice(0, 5).map((p, idx) => {
    const trending = typeof p?.trending === "boolean" ? p.trending : idx % 2 === 0;
    const viral = typeof p?.viral === "boolean" ? p.viral : idx === 1;
    const popular = typeof p?.popular === "boolean" ? p.popular : !trending && !viral;
    const out = {
      name: ensureName3(p, idx),
      description: safeString2(p?.description, "Producto recomendado para ti."),
      price: safeString2(p?.price, "\u20AC19.99"),
      imageUrl: safeString2(p?.imageUrl) || pickImage2(idx),
      rating: Number.isFinite(Number(p?.rating)) ? Number(p.rating) : 4.5,
      reviews: Number.isFinite(Number(p?.reviews)) ? Math.max(0, Math.floor(Number(p.reviews))) : 300,
      trending,
      viral,
      popular,
      views: safeString2(p?.views, `${10 + idx * 5}k+`),
      tags: ensureArrayTags(p?.tags)
    };
    if (!out.name) out.name = `Producto viral #${idx + 1}`;
    if (!out.imageUrl) out.imageUrl = pickImage2(idx);
    return out;
  });
}
function fallbackProducts(category) {
  const _cat = category || "General";
  return [
    {
      name: "Soporte plegable para port\xE1til",
      description: "Ajustable, ligero y perfecto para mejorar postura y productividad.",
      price: "15\u20AC - 30\u20AC",
      imageUrl: pickImage2(0),
      rating: 4.6,
      reviews: 820,
      trending: true,
      viral: false,
      popular: true,
      views: "25k+",
      tags: ["Oficina", "Postura", "Setup"]
    },
    {
      name: "Mini aspirador inal\xE1mbrico para coche y teclado",
      description: "Compacto, potente y muy \xFAtil para limpieza r\xE1pida diaria.",
      price: "20\u20AC - 45\u20AC",
      imageUrl: pickImage2(1),
      rating: 4.5,
      reviews: 540,
      trending: false,
      viral: true,
      popular: false,
      views: "60k+",
      tags: ["Limpieza", "Coche", "Gadgets"]
    },
    {
      name: "Luz LED con sensor de movimiento",
      description: "Se enciende sola al pasar. Ideal para armarios, pasillos y escaleras.",
      price: "12\u20AC - 25\u20AC",
      imageUrl: pickImage2(2),
      rating: 4.7,
      reviews: 1200,
      trending: true,
      viral: false,
      popular: true,
      views: "40k+",
      tags: ["Hogar", "LED", "Ahorro"]
    }
  ];
}
async function registerRoutes(app2) {
  await setupAuth(app2);
  app2.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.post("/api/products/:id/save", async (req, res) => {
    try {
      const userId = sayUserIdOrDemo(req);
      const productId = Number(req.params.id);
      if (!Number.isFinite(productId)) {
        return res.status(400).json({ message: "ID de producto inv\xE1lido" });
      }
      const action = req?.body?.action === "add" || req?.body?.action === "save" ? req.body.action : "save";
      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      if (product.userId !== userId) {
        return res.status(403).json({
          message: "No puedes modificar este producto (no pertenece a tu usuario demo)."
        });
      }
      return res.json({
        ok: true,
        action,
        productId,
        message: action === "add" ? "Producto a\xF1adido." : "Producto guardado."
      });
    } catch (error) {
      console.error("Error saving/adding product:", error);
      return res.status(500).json({ message: "Error al procesar la acci\xF3n" });
    }
  });
  app2.post("/api/generate-products", async (req, res) => {
    try {
      const userId = getUserIdOrDemo(req);
      const body = req.body || {};
      const category = body.category || "";
      const priceRange = toNumber2(body.priceRange, 3);
      const fastShipping = typeof body.fastShipping === "boolean" ? body.fastShipping : true;
      const useTrendingOnly = typeof body.trendingOnly === "boolean" ? body.trendingOnly : !!body.trending;
      let products2 = [];
      try {
        products2 = await generateProductIdeas(
          category,
          priceRange,
          useTrendingOnly,
          fastShipping
        );
      } catch (e) {
        console.error(
          "generateProductIdeas failed (api/generate-products). Using fallback:",
          e?.message || e
        );
        products2 = fallbackProducts(category);
      }
      const normalized = normalizeForDb(products2);
      const savedProducts = await Promise.all(
        normalized.map(async (product, idx) => {
          try {
            const safe = { ...product, userId, name: ensureName3(product, idx) };
            return await storage.createProduct(safe);
          } catch (err) {
            console.error("createProduct failed, skipping item:", err);
            return null;
          }
        })
      );
      const filtered = savedProducts.filter(Boolean);
      return res.json({ products: filtered });
    } catch (error) {
      console.error("Error generating products:", error);
      res.status(500).json({ message: "Error generating products" });
    }
  });
  app2.post("/api/products/generate", async (req, res) => {
    try {
      const userId = getUserIdOrDemo(req);
      const body = req.body || {};
      const category = body.category || "";
      const priceRange = toNumber2(body.priceRange, 3);
      const fastShipping = typeof body.fastShipping === "boolean" ? body.fastShipping : true;
      const trendingOnly = typeof body.trendingOnly === "boolean" ? body.trendingOnly : false;
      let products2 = [];
      try {
        products2 = await generateProductIdeas(
          category,
          priceRange,
          trendingOnly,
          fastShipping
        );
      } catch (e) {
        console.error(
          "generateProductIdeas failed (/api/products/generate). Using fallback:",
          e?.message || e
        );
        products2 = fallbackProducts(category);
      }
      const normalized = normalizeForDb(products2);
      const savedProducts = await Promise.all(
        normalized.map(async (product, idx) => {
          try {
            const safe = { ...product, userId, name: ensureName3(product, idx) };
            return await storage.createProduct(safe);
          } catch (err) {
            console.error("createProduct failed, skipping item:", err);
            return null;
          }
        })
      );
      const filtered = savedProducts.filter(Boolean);
      if (!filtered.length) {
        return res.json({
          products: normalized.map((p) => ({ ...p, userId }))
        });
      }
      res.json({ products: filtered });
    } catch (error) {
      console.error("Error generating products:", error);
      res.status(500).json({ message: "Error generating products" });
    }
  });
  app2.get("/api/products/recent", async (_req, res) => {
    try {
      const products2 = await storage.getRecentProducts(20);
      res.json({ products: products2 });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
    }
  });
  app2.post("/api/content/generate", async (req, res) => {
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
        videoUrl
      });
      res.json({ videoUrl, content });
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({ message: "Error generating content" });
    }
  });
  app2.get("/api/products", async (_req, res) => {
    try {
      const products2 = await storage.getRecentProducts(20);
      res.json(products2);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
    }
  });
  app2.get("/api/products/user", async (req, res) => {
    try {
      const userId = getUserIdOrDemo(req);
      const products2 = await storage.getUserProducts(userId, 50);
      res.json(products2);
    } catch (error) {
      console.error("Error fetching user products:", error);
      res.status(500).json({ message: "Error fetching user products" });
    }
  });
  app2.post("/api/generate-content", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (user?.subscriptionPlan === "free" && (user.monthlyContentGenerations || 0) >= 5) {
        return res.status(403).json({
          message: "L\xEDmite de generaciones gratuitas alcanzado. Mejora tu plan."
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
  app2.get("/api/contents/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const contents2 = await storage.getUserContents(userId, 50);
      res.json(contents2);
    } catch (error) {
      console.error("Error fetching user contents:", error);
      res.status(500).json({ message: "Error fetching user contents" });
    }
  });
  app2.get("/api/subscription-plans", async (_req, res) => {
    try {
      const plans = await storage.getSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({ message: "Error fetching subscription plans" });
    }
  });
  app2.post(
    "/api/create-subscription",
    isAuthenticated,
    async (req, res) => {
      try {
        const userId = req.user.claims.sub;
        const { planId } = req.body;
        let user = await storage.getUser(userId);
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        if (user.stripeSubscriptionId) {
          const subscription2 = await stripe.subscriptions.retrieve(
            user.stripeSubscriptionId
          );
          if (subscription2.status === "active") {
            const invoice = subscription2.latest_invoice;
            const paymentIntent = typeof invoice === "object" && invoice ? invoice.payment_intent : null;
            const clientSecret = typeof paymentIntent === "object" && paymentIntent ? paymentIntent.client_secret : null;
            return res.json({
              subscriptionId: subscription2.id,
              clientSecret
            });
          }
        }
        let customerId = user.stripeCustomerId;
        if (!customerId) {
          const customer = await stripe.customers.create({
            email: user.email || void 0,
            name: `${user.firstName} ${user.lastName}`.trim() || void 0
          });
          customerId = customer.id;
          user = await storage.updateUserStripeInfo(userId, customerId, "");
        }
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: planId }],
          payment_behavior: "default_incomplete",
          expand: ["latest_invoice.payment_intent"]
        });
        await storage.updateUserStripeInfo(userId, customerId, subscription.id);
        const newInvoice = subscription.latest_invoice;
        const newPaymentIntent = typeof newInvoice === "object" && newInvoice ? newInvoice.payment_intent : null;
        const newClientSecret = typeof newPaymentIntent === "object" && newPaymentIntent ? newPaymentIntent.client_secret : null;
        res.json({
          subscriptionId: subscription.id,
          clientSecret: newClientSecret
        });
      } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({ message: "Error creating subscription" });
      }
    }
  );
  app2.get("/api/templates", async (req, res) => {
    try {
      const { category } = req.query;
      const templates2 = await storage.getTemplates(category);
      res.json(templates2);
    } catch (error) {
      console.error("Error fetching templates:", error);
      res.status(500).json({ message: "Error fetching templates" });
    }
  });
  app2.post("/api/templates", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const templateData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate({
        ...templateData,
        creatorId: userId
      });
      res.json(template);
    } catch (error) {
      console.error("Error creating template:", error);
      res.status(500).json({ message: "Error creating template" });
    }
  });
  app2.get("/api/templates/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const templates2 = await storage.getUserTemplates(userId);
      res.json(templates2);
    } catch (error) {
      console.error("Error fetching user templates:", error);
      res.status(500).json({ message: "Error fetching user templates" });
    }
  });
  app2.post(
    "/api/templates/:id/purchase",
    isAuthenticated,
    async (req, res) => {
      try {
        const userId = req.user.claims.sub;
        const templateId = parseInt(req.params.id);
        const { price } = req.body;
        const purchase = await storage.purchaseTemplate(
          userId,
          templateId,
          price
        );
        res.json(purchase);
      } catch (error) {
        console.error("Error purchasing template:", error);
        res.status(500).json({ message: "Error purchasing template" });
      }
    }
  );
  app2.post("/api/stripe/webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );
    } catch (err) {
      console.log("Webhook signature verification failed.", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    try {
      switch (event.type) {
        case "invoice.payment_succeeded": {
          const invoice = event.data.object;
          const subscriptionId = invoice.subscription;
          const customerId = invoice.customer;
          const subscription = await stripe.subscriptions.retrieve(
            subscriptionId
          );
          await stripe.customers.retrieve(customerId);
          const users2 = await storage.getUserByStripeCustomerId(customerId);
          if (users2.length > 0) {
            const user = users2[0];
            const planName = subscription.items.data[0].price.nickname || "premium";
            const endsAt = new Date(subscription.current_period_end * 1e3);
            await storage.updateUserSubscription(user.id, planName, endsAt);
            console.log(
              `\u2705 Subscription activated for user ${user.id}: ${planName}`
            );
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
            console.log(`\u274C Subscription cancelled for user ${user.id}`);
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
  app2.post("/api/billing-portal", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user?.stripeCustomerId) {
        return res.status(400).json({ message: "No hay informaci\xF3n de facturaci\xF3n disponible" });
      }
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${req.protocol}://${req.get("host")}/dashboard`
      });
      res.json({ url: portalSession.url });
    } catch (error) {
      console.error("Error creating billing portal session:", error);
      res.status(500).json({ message: "Error accessing billing portal" });
    }
  });
  app2.post("/api/affiliate/track", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const { productId, type, amount } = req.body;
      const transaction = await storage.trackAffiliateTransaction(
        userId,
        productId,
        type,
        amount
      );
      res.json(transaction);
    } catch (error) {
      console.error("Error tracking affiliate transaction:", error);
      res.status(500).json({ message: "Error tracking affiliate transaction" });
    }
  });
  app2.get("/api/affiliate/earnings", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const earnings = await storage.getUserAffiliateEarnings(userId);
      res.json({ earnings });
    } catch (error) {
      console.error("Error fetching affiliate earnings:", error);
      res.status(500).json({ message: "Error fetching affiliate earnings" });
    }
  });
  app2.get("/api/consulting", async (_req, res) => {
    try {
      const services = await storage.getConsultingServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching consulting services:", error);
      res.status(500).json({ message: "Error fetching consulting services" });
    }
  });
  app2.post("/api/consulting", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const serviceData = insertConsultingServiceSchema.parse(req.body);
      const service = await storage.createConsultingService({
        ...serviceData,
        consultantId: userId
      });
      res.json(service);
    } catch (error) {
      console.error("Error creating consulting service:", error);
      res.status(500).json({ message: "Error creating consulting service" });
    }
  });
  app2.get("/api/consulting/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const services = await storage.getConsultingServices(userId);
      res.json(services);
    } catch (error) {
      console.error("Error fetching consulting services:", error);
      res.status(500).json({ message: "Error fetching consulting services" });
    }
  });
  app2.patch(
    "/api/consulting/:id/status",
    isAuthenticated,
    async (req, res) => {
      try {
        const serviceId = parseInt(req.params.id);
        const { status } = req.body;
        const service = await storage.updateConsultingServiceStatus(
          serviceId,
          status
        );
        res.json(service);
      } catch (error) {
        console.error("Error updating consulting service status:", error);
        res.status(500).json({ message: "Error updating consulting service status" });
      }
    }
  );
  const httpServer = createServer(app2);
  return httpServer;
}
function sayUserIdOrDemo(req) {
  return getUserIdOrDemo(req);
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  root: path.resolve(__dirname, "client"),
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "..", "client", "dist");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

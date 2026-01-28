import {
  users,
  type User,
  type UpsertUser,
  products,
  type Product,
  type InsertProduct,
  contents,
  type Content,
  type InsertContent,
  templates,
  type Template,
  type InsertTemplate,
  templatePurchases,
  type TemplatePurchase,
  affiliateTransactions,
  type AffiliateTransaction,
  consultingServices,
  type ConsultingService,
  type InsertConsultingService,
  subscriptionPlans,
  type SubscriptionPlan,
} from "@shared/schema";

import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

// Interface for all storage operations with monetization features
export interface IStorage {
  // User methods (required for auth)
  getUser(id: string): Promise<User | undefined>;
  getUserByStripeCustomerId(stripeCustomerId: string): Promise<User[]>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserSubscription(
    userId: string,
    plan: string,
    endsAt?: Date,
  ): Promise<User>;
  updateUserStripeInfo(
    userId: string,
    stripeCustomerId: string,
    stripeSubscriptionId: string,
  ): Promise<User>;
  trackUserUsage(userId: string, type: "product" | "content"): Promise<void>;
  resetUserUsage(userId: string): Promise<void>;

  // Product methods
  getProduct(id: number): Promise<Product | undefined>;
  getRecentProducts(limit?: number): Promise<Product[]>;
  getUserProducts(userId: string, limit?: number): Promise<Product[]>;
  createProduct(product: InsertProduct & { userId: string }): Promise<Product>;

  // Content methods
  getContent(id: number): Promise<Content | undefined>;
  getContentByProduct(productId: number): Promise<Content[]>;
  getUserContents(userId: string, limit?: number): Promise<Content[]>;
  createContent(content: InsertContent & { userId: string }): Promise<Content>;

  // Template marketplace methods
  getTemplate(id: number): Promise<Template | undefined>;
  getTemplates(category?: string, limit?: number): Promise<Template[]>;
  getUserTemplates(userId: string): Promise<Template[]>;
  createTemplate(
    template: InsertTemplate & { creatorId: string },
  ): Promise<Template>;
  purchaseTemplate(
    buyerId: string,
    templateId: number,
    price: number,
  ): Promise<TemplatePurchase>;

  // Affiliate methods
  trackAffiliateTransaction(
    userId: string,
    productId: number,
    type: string,
    amount: number,
  ): Promise<AffiliateTransaction>;
  getUserAffiliateEarnings(userId: string): Promise<number>;

  // Consulting methods
  getConsultingServices(userId?: string): Promise<ConsultingService[]>;
  createConsultingService(
    service: InsertConsultingService & { consultantId: string },
  ): Promise<ConsultingService>;
  updateConsultingServiceStatus(
    serviceId: number,
    status: string,
  ): Promise<ConsultingService>;

  // Subscription plans
  getSubscriptionPlans(): Promise<SubscriptionPlan[]>;
}

// Helpers
function cleanStr(v: any, fallback = ""): string {
  if (typeof v === "string") return v.trim();
  if (v == null) return fallback;
  return String(v).trim();
}

function toBool(v: any, fallback = false): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string")
    return ["true", "1", "yes", "si"].includes(v.toLowerCase());
  return fallback;
}

function toNumber(v: any, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function ensurePrice(v: any): string {
  const s = cleanStr(v);
  return s ? s : "€19.99";
}

function ensureName(v: any): string {
  const s = cleanStr(v);
  return s ? s : "Producto recomendado";
}

function ensureDescription(v: any): string {
  const s = cleanStr(v);
  return s ? s.slice(0, 150) : "Producto recomendado para vender online.";
}

function ensureTags(v: any): string[] {
  if (Array.isArray(v))
    return v
      .map((x) => cleanStr(x))
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

function ensureViews(v: any): string {
  const s = cleanStr(v);
  return s ? s : "10k+";
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByStripeCustomerId(stripeCustomerId: string): Promise<User[]> {
    return db
      .select()
      .from(users)
      .where(eq(users.stripeCustomerId, stripeCustomerId));
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        affiliateCode: userData.id ? `VCA${userData.id.slice(-6)}` : undefined,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserSubscription(
    userId: string,
    plan: string,
    endsAt?: Date,
  ): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        subscriptionPlan: plan,
        subscriptionEndsAt: endsAt,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserStripeInfo(
    userId: string,
    stripeCustomerId: string,
    stripeSubscriptionId: string,
  ): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId,
        stripeSubscriptionId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async trackUserUsage(
    userId: string,
    type: "product" | "content",
  ): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) return;

    const now = new Date();
    const lastReset = user.lastResetDate || new Date();
    const shouldReset =
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear();

    if (shouldReset) {
      await this.resetUserUsage(userId);
    }

    const currentProduct = (user as any).monthlyProductGenerations || 0;
    const currentContent = (user as any).monthlyContentGenerations || 0;

    if (type === "product") {
      await db
        .update(users)
        .set({ monthlyProductGenerations: currentProduct + 1 })
        .where(eq(users.id, userId));
    } else {
      await db
        .update(users)
        .set({ monthlyContentGenerations: currentContent + 1 })
        .where(eq(users.id, userId));
    }
  }

  async resetUserUsage(userId: string): Promise<void> {
    await db
      .update(users)
      .set({
        monthlyProductGenerations: 0,
        monthlyContentGenerations: 0,
        lastResetDate: new Date(),
      })
      .where(eq(users.id, userId));
  }

  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return product;
  }

  async getRecentProducts(limit: number = 10): Promise<Product[]> {
    return db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))
      .limit(limit);
  }

  async getUserProducts(
    userId: string,
    limit: number = 10,
  ): Promise<Product[]> {
    return db
      .select()
      .from(products)
      .where(eq(products.userId, userId))
      .orderBy(desc(products.createdAt))
      .limit(limit);
  }

  async createProduct(
    productData: InsertProduct & { userId: string },
  ): Promise<Product> {
    // ✅ NORMALIZACIÓN ANTI-NOT-NULL
    const safe: any = {
      ...productData,
      userId: cleanStr(productData.userId, "demo_user_1"),

      name: ensureName((productData as any).name),
      description: ensureDescription((productData as any).description),
      price: ensurePrice((productData as any).price),

      imageUrl: cleanStr((productData as any).imageUrl, null as any),
      rating: Math.max(
        0,
        Math.min(5, toNumber((productData as any).rating, 4.5)),
      ),
      reviews: Math.max(
        0,
        Math.floor(toNumber((productData as any).reviews, 300)),
      ),

      trending: toBool((productData as any).trending, false),
      viral: toBool((productData as any).viral, false),
      popular: toBool((productData as any).popular, false),

      views: ensureViews((productData as any).views),
      tags: ensureTags((productData as any).tags),
    };

    // Si tu schema exige boolean flags, garantizamos coherencia mínima
    if (!safe.trending && !safe.viral) safe.popular = true;

    const [product] = await db.insert(products).values(safe).returning();
    return product;
  }

  // Content methods
  async getContent(id: number): Promise<Content | undefined> {
    const [content] = await db
      .select()
      .from(contents)
      .where(eq(contents.id, id));
    return content;
  }

  async getContentByProduct(productId: number): Promise<Content[]> {
    return db
      .select()
      .from(contents)
      .where(eq(contents.productId, productId))
      .orderBy(desc(contents.createdAt));
  }

  async getUserContents(
    userId: string,
    limit: number = 10,
  ): Promise<Content[]> {
    return db
      .select()
      .from(contents)
      .where(eq(contents.userId, userId))
      .orderBy(desc(contents.createdAt))
      .limit(limit);
  }

  async createContent(
    contentData: InsertContent & { userId: string },
  ): Promise<Content> {
    const [content] = await db.insert(contents).values(contentData).returning();
    return content;
  }

  // Template marketplace methods
  async getTemplate(id: number): Promise<Template | undefined> {
    const [template] = await db
      .select()
      .from(templates)
      .where(eq(templates.id, id));
    return template;
  }

  async getTemplates(
    category?: string,
    limit: number = 20,
  ): Promise<Template[]> {
    // Si Drizzle te da guerra con "query = query.where()", lo dejamos simple:
    if (category) {
      return db
        .select()
        .from(templates)
        .where(and(eq(templates.isActive, true), eq(templates.category, category)))
        .orderBy(desc(templates.downloads))
        .limit(limit);
    }

    return db
      .select()
      .from(templates)
      .where(eq(templates.isActive, true))
      .orderBy(desc(templates.downloads))
      .limit(limit);
  }

  async getUserTemplates(userId: string): Promise<Template[]> {
    return db
      .select()
      .from(templates)
      .where(eq(templates.creatorId, userId))
      .orderBy(desc(templates.createdAt));
  }

  async createTemplate(
    templateData: InsertTemplate & { creatorId: string },
  ): Promise<Template> {
    const [template] = await db
      .insert(templates)
      .values(templateData)
      .returning();
    return template;
  }

  async purchaseTemplate(
    buyerId: string,
    templateId: number,
    price: number,
  ): Promise<TemplatePurchase> {
    const [purchase] = await db
      .insert(templatePurchases)
      .values({ buyerId, templateId, price })
      .returning();

    // ✅ Incremento de downloads sin .then() dentro del update
    const [t] = await db
      .select({ downloads: templates.downloads })
      .from(templates)
      .where(eq(templates.id, templateId));

    await db
      .update(templates)
      .set({ downloads: (t?.downloads || 0) + 1 })
      .where(eq(templates.id, templateId));

    return purchase;
  }

  // Affiliate methods
  async trackAffiliateTransaction(
    userId: string,
    productId: number,
    type: string,
    amount: number,
  ): Promise<AffiliateTransaction> {
    const [transaction] = await db
      .insert(affiliateTransactions)
      .values({
        userId,
        productId,
        transactionType: type,
        amount,
      })
      .returning();

    if (type === "commission") {
      const user = await this.getUser(userId);
      const current = (user as any)?.affiliateEarnings || 0;

      await db
        .update(users)
        .set({ affiliateEarnings: current + amount })
        .where(eq(users.id, userId));
    }

    return transaction;
  }

  async getUserAffiliateEarnings(userId: string): Promise<number> {
    const user = await this.getUser(userId);
    return (user as any)?.affiliateEarnings || 0;
  }

  // Consulting methods
  async getConsultingServices(userId?: string): Promise<ConsultingService[]> {
    if (userId) {
      return db
        .select()
        .from(consultingServices)
        .where(eq(consultingServices.clientId, userId))
        .orderBy(desc(consultingServices.createdAt));
    }

    return db
      .select()
      .from(consultingServices)
      .orderBy(desc(consultingServices.createdAt));
  }

  async createConsultingService(
    serviceData: InsertConsultingService & { consultantId: string },
  ): Promise<ConsultingService> {
    const [service] = await db
      .insert(consultingServices)
      .values(serviceData)
      .returning();
    return service;
  }

  async updateConsultingServiceStatus(
    serviceId: number,
    status: string,
  ): Promise<ConsultingService> {
    const [service] = await db
      .update(consultingServices)
      .set({
        status,
        ...(status === "completed" ? { completedAt: new Date() } : {}),
      })
      .where(eq(consultingServices.id, serviceId))
      .returning();
    return service;
  }

  // Subscription plans
  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return db
      .select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.isActive, true))
      .orderBy(subscriptionPlans.price);
  }
}

export const storage = new DatabaseStorage();

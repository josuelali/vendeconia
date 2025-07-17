import { 
  users, 
  type User, 
  type InsertUser, 
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
  type SubscriptionPlan
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte } from "drizzle-orm";

// Interface for all storage operations with monetization features
export interface IStorage {
  // User methods (required for auth)
  getUser(id: string): Promise<User | undefined>;
  getUserByStripeCustomerId(stripeCustomerId: string): Promise<User[]>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserSubscription(userId: string, plan: string, endsAt?: Date): Promise<User>;
  updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User>;
  trackUserUsage(userId: string, type: 'product' | 'content'): Promise<void>;
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
  createTemplate(template: InsertTemplate & { creatorId: string }): Promise<Template>;
  purchaseTemplate(buyerId: string, templateId: number, price: number): Promise<TemplatePurchase>;
  
  // Affiliate methods
  trackAffiliateTransaction(userId: string, productId: number, type: string, amount: number): Promise<AffiliateTransaction>;
  getUserAffiliateEarnings(userId: string): Promise<number>;
  
  // Consulting methods
  getConsultingServices(userId?: string): Promise<ConsultingService[]>;
  createConsultingService(service: InsertConsultingService & { consultantId: string }): Promise<ConsultingService>;
  updateConsultingServiceStatus(serviceId: number, status: string): Promise<ConsultingService>;
  
  // Subscription plans
  getSubscriptionPlans(): Promise<SubscriptionPlan[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods (required for auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByStripeCustomerId(stripeCustomerId: string): Promise<User[]> {
    const userList = await db.select().from(users).where(eq(users.stripeCustomerId, stripeCustomerId));
    return userList;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        // Generate affiliate code if not exists
        affiliateCode: userData.id ? `VCA${userData.id.slice(-6)}` : undefined
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

  async updateUserSubscription(userId: string, plan: string, endsAt?: Date): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        subscriptionPlan: plan,
        subscriptionEndsAt: endsAt,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId,
        stripeSubscriptionId,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async trackUserUsage(userId: string, type: 'product' | 'content'): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) return;

    // Reset usage if it's a new month
    const now = new Date();
    const lastReset = user.lastResetDate || new Date();
    const shouldReset = now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear();

    if (shouldReset) {
      await this.resetUserUsage(userId);
    }

    // Increment usage
    const field = type === 'product' ? 'monthlyProductGenerations' : 'monthlyContentGenerations';
    await db
      .update(users)
      .set({
        [field]: (user[field] || 0) + 1
      })
      .where(eq(users.id, userId));
  }

  async resetUserUsage(userId: string): Promise<void> {
    await db
      .update(users)
      .set({
        monthlyProductGenerations: 0,
        monthlyContentGenerations: 0,
        lastResetDate: new Date()
      })
      .where(eq(users.id, userId));
  }
  
  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getRecentProducts(limit: number = 10): Promise<Product[]> {
    const productList = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))
      .limit(limit);
    return productList;
  }

  async getUserProducts(userId: string, limit: number = 10): Promise<Product[]> {
    const productList = await db
      .select()
      .from(products)
      .where(eq(products.userId, userId))
      .orderBy(desc(products.createdAt))
      .limit(limit);
    return productList;
  }

  async createProduct(productData: InsertProduct & { userId: string }): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(productData)
      .returning();
    return product;
  }

  // Content methods
  async getContent(id: number): Promise<Content | undefined> {
    const [content] = await db.select().from(contents).where(eq(contents.id, id));
    return content;
  }

  async getContentByProduct(productId: number): Promise<Content[]> {
    const contentList = await db
      .select()
      .from(contents)
      .where(eq(contents.productId, productId))
      .orderBy(desc(contents.createdAt));
    return contentList;
  }

  async getUserContents(userId: string, limit: number = 10): Promise<Content[]> {
    const contentList = await db
      .select()
      .from(contents)
      .where(eq(contents.userId, userId))
      .orderBy(desc(contents.createdAt))
      .limit(limit);
    return contentList;
  }

  async createContent(contentData: InsertContent & { userId: string }): Promise<Content> {
    const [content] = await db
      .insert(contents)
      .values(contentData)
      .returning();
    return content;
  }

  // Template marketplace methods
  async getTemplate(id: number): Promise<Template | undefined> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template;
  }

  async getTemplates(category?: string, limit: number = 20): Promise<Template[]> {
    let query = db
      .select()
      .from(templates)
      .where(eq(templates.isActive, true));

    if (category) {
      query = query.where(eq(templates.category, category));
    }

    const templateList = await query
      .orderBy(desc(templates.downloads))
      .limit(limit);
    return templateList;
  }

  async getUserTemplates(userId: string): Promise<Template[]> {
    const templateList = await db
      .select()
      .from(templates)
      .where(eq(templates.creatorId, userId))
      .orderBy(desc(templates.createdAt));
    return templateList;
  }

  async createTemplate(templateData: InsertTemplate & { creatorId: string }): Promise<Template> {
    const [template] = await db
      .insert(templates)
      .values(templateData)
      .returning();
    return template;
  }

  async purchaseTemplate(buyerId: string, templateId: number, price: number): Promise<TemplatePurchase> {
    const [purchase] = await db
      .insert(templatePurchases)
      .values({
        buyerId,
        templateId,
        price
      })
      .returning();

    // Increment download count
    await db
      .update(templates)
      .set({
        downloads: db.select().from(templates).where(eq(templates.id, templateId)).then(t => (t[0]?.downloads || 0) + 1)
      })
      .where(eq(templates.id, templateId));

    return purchase;
  }

  // Affiliate methods
  async trackAffiliateTransaction(userId: string, productId: number, type: string, amount: number): Promise<AffiliateTransaction> {
    const [transaction] = await db
      .insert(affiliateTransactions)
      .values({
        userId,
        productId,
        transactionType: type,
        amount
      })
      .returning();

    // Update user's affiliate earnings if it's a commission
    if (type === 'commission') {
      await db
        .update(users)
        .set({
          affiliateEarnings: db.select().from(users).where(eq(users.id, userId)).then(u => (u[0]?.affiliateEarnings || 0) + amount)
        })
        .where(eq(users.id, userId));
    }

    return transaction;
  }

  async getUserAffiliateEarnings(userId: string): Promise<number> {
    const user = await this.getUser(userId);
    return user?.affiliateEarnings || 0;
  }

  // Consulting methods
  async getConsultingServices(userId?: string): Promise<ConsultingService[]> {
    let query = db.select().from(consultingServices);

    if (userId) {
      query = query.where(eq(consultingServices.clientId, userId));
    }

    const services = await query.orderBy(desc(consultingServices.createdAt));
    return services;
  }

  async createConsultingService(serviceData: InsertConsultingService & { consultantId: string }): Promise<ConsultingService> {
    const [service] = await db
      .insert(consultingServices)
      .values(serviceData)
      .returning();
    return service;
  }

  async updateConsultingServiceStatus(serviceId: number, status: string): Promise<ConsultingService> {
    const [service] = await db
      .update(consultingServices)
      .set({
        status,
        ...(status === 'completed' ? { completedAt: new Date() } : {})
      })
      .where(eq(consultingServices.id, serviceId))
      .returning();
    return service;
  }

  // Subscription plans
  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    const plans = await db
      .select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.isActive, true))
      .orderBy(subscriptionPlans.price);
    return plans;
  }
}

export const storage = new DatabaseStorage();

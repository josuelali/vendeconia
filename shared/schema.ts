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
  real,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table with monetization features
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  
  // Subscription fields
  subscriptionPlan: varchar("subscription_plan").default("free"), // free, premium, enterprise
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
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Products table with affiliate features
export const products = pgTable("products", {
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
  
  createdAt: timestamp("created_at").defaultNow(),
});

// Content table
export const contents = pgTable("contents", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  productId: integer("product_id").references(() => products.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  music: text("music").notNull(),
  animation: text("animation").notNull(),
  cta: text("cta").notNull(),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Templates marketplace
export const templates = pgTable("templates", {
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
  createdAt: timestamp("created_at").defaultNow(),
});

// Template purchases
export const templatePurchases = pgTable("template_purchases", {
  id: serial("id").primaryKey(),
  buyerId: varchar("buyer_id").references(() => users.id),
  templateId: integer("template_id").references(() => templates.id),
  price: real("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Affiliate transactions
export const affiliateTransactions = pgTable("affiliate_transactions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  productId: integer("product_id").references(() => products.id),
  transactionType: varchar("transaction_type").notNull(), // product_click, purchase, commission
  amount: real("amount").default(0),
  currency: varchar("currency").default("EUR"),
  externalTransactionId: text("external_transaction_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Consulting services
export const consultingServices = pgTable("consulting_services", {
  id: serial("id").primaryKey(),
  consultantId: varchar("consultant_id").references(() => users.id),
  clientId: varchar("client_id").references(() => users.id),
  serviceType: varchar("service_type").notNull(), // store_setup, marketing_strategy, product_research
  price: real("price").notNull(),
  status: varchar("status").default("pending"), // pending, in_progress, completed, cancelled
  description: text("description"),
  scheduledAt: timestamp("scheduled_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Subscription plans configuration
export const subscriptionPlans = pgTable("subscription_plans", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  currency: varchar("currency").default("EUR"),
  interval: varchar("interval").default("month"), // month, year
  features: jsonb("features").notNull(),
  stripePriceId: varchar("stripe_price_id"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
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
  supplierUrl: true,
});

export const insertContentSchema = createInsertSchema(contents).pick({
  productId: true,
  title: true,
  description: true,
  music: true,
  animation: true,
  cta: true,
  videoUrl: true,
});

export const insertTemplateSchema = createInsertSchema(templates).pick({
  name: true,
  description: true,
  category: true,
  price: true,
  previewUrl: true,
  templateData: true,
});

export const insertConsultingServiceSchema = createInsertSchema(consultingServices).pick({
  clientId: true,
  serviceType: true,
  price: true,
  description: true,
  scheduledAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Content = typeof contents.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;

export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;

export type TemplatePurchase = typeof templatePurchases.$inferSelect;

export type AffiliateTransaction = typeof affiliateTransactions.$inferSelect;

export type ConsultingService = typeof consultingServices.$inferSelect;
export type InsertConsultingService = z.infer<typeof insertConsultingServiceSchema>;

export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;

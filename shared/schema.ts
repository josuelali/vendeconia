import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
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
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
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
  userId: true,
});

// Content table
export const contents = pgTable("contents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  music: text("music").notNull(),
  animation: text("animation").notNull(),
  cta: text("cta").notNull(),
  videoUrl: text("video_url"),
  productId: integer("product_id").references(() => products.id),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContentSchema = createInsertSchema(contents).pick({
  title: true,
  description: true,
  music: true,
  animation: true,
  cta: true,
  videoUrl: true,
  productId: true,
  userId: true,
});

// Generate nice typescript types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Content = typeof contents.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;

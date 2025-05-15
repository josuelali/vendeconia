import { users, type User, type InsertUser, products, type Product, type InsertProduct, contents, type Content, type InsertContent } from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProduct(id: number): Promise<Product | undefined>;
  getRecentProducts(limit?: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Content methods
  getContent(id: number): Promise<Content | undefined>;
  getContentByProduct(productId: number): Promise<Content[]>;
  createContent(content: InsertContent): Promise<Content>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private contents: Map<number, Content>;
  private userId: number;
  private productId: number;
  private contentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.contents = new Map();
    this.userId = 1;
    this.productId = 1;
    this.contentId = 1;
    
    // Seed with demo products
    this.seedDemoProducts();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getRecentProducts(limit: number = 10): Promise<Product[]> {
    const productArray = Array.from(this.products.values());
    // Sort by creation date descending
    productArray.sort((a, b) => {
      return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
    });
    return productArray.slice(0, limit);
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }
  
  // Content methods
  async getContent(id: number): Promise<Content | undefined> {
    return this.contents.get(id);
  }
  
  async getContentByProduct(productId: number): Promise<Content[]> {
    return Array.from(this.contents.values()).filter(
      (content) => content.productId === productId
    );
  }
  
  async createContent(insertContent: InsertContent): Promise<Content> {
    const id = this.contentId++;
    const content: Content = {
      ...insertContent,
      id,
      createdAt: new Date()
    };
    this.contents.set(id, content);
    return content;
  }
  
  // Seed with demo products for initial display
  private seedDemoProducts() {
    const demoProducts: InsertProduct[] = [
      {
        name: "Organizador Multifuncional para Gadgets",
        description: "Mantén todos tus cables, cargadores y accesorios electrónicos organizados con este elegante estuche resistente al agua.",
        price: "€19.99",
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
        rating: 4.5,
        reviews: 342,
        trending: true,
        viral: false,
        popular: false,
        views: "15k+",
        tags: ["Tecnología", "Organización", "Unisex"],
        userId: 1
      },
      {
        name: "Botella Motivacional con Indicador de Tiempo",
        description: "Mantente hidratado a lo largo del día con esta botella que te recuerda cuándo debes beber agua. Libre de BPA.",
        price: "€24.99",
        imageUrl: "https://pixabay.com/get/ge1501c97962eed23b0a39fe285bfc80f0d7ba3579b28c1a262637be0782034bd7f30aa43ffa072d1cbad2bf58c3fa3d241b6549bd0211da2fb8bcd52f33725e2_1280.jpg",
        rating: 5,
        reviews: 687,
        trending: true,
        viral: true,
        popular: false,
        views: "32k+",
        tags: ["Fitness", "Ecológico", "Bestseller"],
        userId: 1
      },
      {
        name: "Luz LED Inteligente Multicolor",
        description: "Transforma el ambiente de tu hogar con esta luz LED que ofrece 16 millones de colores y control por voz y app.",
        price: "€29.99",
        imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350",
        rating: 4,
        reviews: 429,
        trending: false,
        viral: false,
        popular: true,
        views: "24k+",
        tags: ["Smart Home", "Decoración", "WiFi"],
        userId: 1
      }
    ];
    
    demoProducts.forEach(product => {
      this.createProduct(product);
    });
  }
}

export const storage = new MemStorage();

import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  bigint,
  json,
} from "drizzle-orm/mysql-core";

// ─── Users (managed by OAuth) ───
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 320 }).unique(),
  passwordHash: varchar("passwordHash", { length: 255 }),
  name: varchar("name", { length: 255 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Courses ───
export const courses = mysqlTable("courses", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  shortDescription: text("shortDescription"),
  category: mysqlEnum("category", [
    "ethical-hacking",
    "network-security",
    "web-security",
    "malware-analysis",
    "digital-forensics",
    "cloud-security",
  ]).notNull(),
  level: mysqlEnum("level", ["beginner", "intermediate", "advanced"]).notNull(),
  duration: varchar("duration", { length: 50 }),
  price: int("price").default(0),
  thumbnail: text("thumbnail"),
  featured: int("featured").default(0),
  status: mysqlEnum("status", ["published", "draft"]).default("published").notNull(),
  curriculum: json("curriculum").$type<{ title: string; lessons: string[] }[]>(),
  whatYoullLearn: json("whatYoullLearn").$type<string[]>(),
  requirements: json("requirements").$type<string[]>(),
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: text("metaDescription"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

// ─── Testimonials ───
export const testimonials = mysqlTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }),
  content: text("content").notNull(),
  rating: int("rating").default(5),
  avatar: text("avatar"),
  featured: int("featured").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// ─── Reviews ───
export const reviews = mysqlTable("reviews", {
  id: serial("id").primaryKey(),
  courseId: bigint("courseId", { mode: "number", unsigned: true }).notNull(),
  userName: varchar("userName", { length: 255 }),
  userEmail: varchar("userEmail", { length: 320 }),
  content: text("content").notNull(),
  rating: int("rating").default(5),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  reply: text("reply"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

// ─── Gallery Images ───
export const galleryImages = mysqlTable("galleryImages", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  caption: varchar("caption", { length: 255 }),
  category: varchar("category", { length: 100 }),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = typeof galleryImages.$inferInsert;

// ─── Contacts ───
export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

// ─── Site Settings (singleton) ───
export const siteSettings = mysqlTable("siteSettings", {
  id: serial("id").primaryKey(),
  siteTitle: varchar("siteTitle", { length: 255 }).default("Phase Academy"),
  siteDescription: text("siteDescription"),
  logoUrl: text("logoUrl"),
  faviconUrl: text("faviconUrl"),
  defaultMetaTitle: varchar("defaultMetaTitle", { length: 255 }),
  defaultMetaDescription: text("defaultMetaDescription"),
  socialTwitter: varchar("socialTwitter", { length: 255 }),
  socialLinkedin: varchar("socialLinkedin", { length: 255 }),
  socialGithub: varchar("socialGithub", { length: 255 }),
  socialYoutube: varchar("socialYoutube", { length: 255 }),
  socialDiscord: varchar("socialDiscord", { length: 255 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 50 }),
  contactAddress: text("contactAddress"),
  analyticsGaId: varchar("analyticsGaId", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type InsertSiteSettings = typeof siteSettings.$inferInsert;

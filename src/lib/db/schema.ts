// filepath: src/lib/db/schema.ts
import { pgTable, serial, integer, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

// TABLE 1: Deployed Systems (Enterprise Solutions)
export const solutionsProjects = pgTable("solutions_projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  abstract: varchar("abstract", { length: 300 }).notNull(),
  techStack: text("tech_stack").array().notNull(),
  heroAssetUrl: text("hero_asset_url"),
  architectureContent: text("architecture_content"),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// TABLE 2: Academy (Conducted Workshops & FDPs — portfolio/proof-of-work)
export const academyWorkshops = pgTable("academy_workshops", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  durationDays: integer("duration_days").notNull().default(1),
  institution: varchar("institution", { length: 255 }),
  conductedAt: timestamp("conducted_at"),
  participantCount: integer("participant_count"),
  coverImageUrl: text("cover_image_url"),
  topicsCovered: text("topics_covered").array(),
  testimonial: varchar("testimonial", { length: 500 }),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// TABLE 3: Team Members (Engineering Roster)
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  bio: varchar("bio", { length: 500 }).notNull(),
  techStack: text("tech_stack").array().notNull(),
  photoUrl: text("photo_url"),
  displayOrder: integer("display_order").default(99).notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// TABLE 4: Site Metrics (Single-row config — manually controlled from admin)
export const siteMetrics = pgTable("site_metrics", {
  id: serial("id").primaryKey(),
  systemsDeployed: integer("systems_deployed").default(0).notNull(),
  workshopsConducted: integer("workshops_conducted").default(0).notNull(),
  participantsTrained: integer("participants_trained").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// TABLE 5: Contact Messages (Inbox)
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  type: varchar("type", { length: 20 }).notNull(), // 'enterprise' | 'academy'
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
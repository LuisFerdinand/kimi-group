// lib/db/schema.ts
import { pgTable, serial, varchar, text, timestamp, boolean, integer, jsonb, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// User Roles Enum
export const userRoles = {
  ADMIN: "admin",
  EDITOR: "editor",
  CONTRIBUTOR: "contributor",
  READER: "reader"
} as const;

export type UserRole = typeof userRoles[keyof typeof userRoles];

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 255 }),
  role: varchar("role", { length: 20 }).notNull().default(userRoles.READER),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Blog Posts Table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featured: boolean("featured").default(false),
  authorId: integer("author_id")
    .references(() => users.id)
    .notNull(),
  category: varchar("category", { length: 100 }),
  readTime: integer("read_time").default(5),
  likes: integer("likes").default(0),
  commentsCount: integer("comments_count").default(0),
  publishedAt: timestamp("published_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Blog Comments Table
export const blogComments = pgTable("blog_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
    .references(() => blogPosts.id)
    .notNull(),
  authorId: integer("author_id")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  parentId: integer("parent_id"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Brand/Division Content Table
export const brandDivisions = pgTable("brand_divisions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  tagline: varchar("tagline", { length: 255 }),
  description: text("description").notNull(),
  backgroundImage: varchar("background_image", { length: 500 }),
  logo: varchar("logo", { length: 500 }),
  color: varchar("color", { length: 20 }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: jsonb("stats").$type<Record<string, any>>().notNull().default({}),
  featured: boolean("featured").default(false),
  authorId: integer("author_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Blog Categories Table
export const blogCategories = pgTable("blog_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Blog Post Categories (Many-to-Many)
export const blogPostCategories = pgTable("blog_post_categories", {
  postId: integer("post_id")
    .references(() => blogPosts.id)
    .notNull(),
  categoryId: integer("category_id")
    .references(() => blogCategories.id)
    .notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.postId, t.categoryId] }),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  blogPosts: many(blogPosts),
  blogComments: many(blogComments),
  brandDivisions: many(brandDivisions),
}));

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  comments: many(blogComments),
  categories: many(blogPostCategories),
}));

export const blogCommentsRelations = relations(blogComments, ({ one }) => ({
  post: one(blogPosts, {
    fields: [blogComments.postId],
    references: [blogPosts.id],
  }),
  author: one(users, {
    fields: [blogComments.authorId],
    references: [users.id],
  }),
  parent: one(blogComments, {
    fields: [blogComments.parentId],
    references: [blogComments.id],
    relationName: "parentComment",
  }),
}));

export const brandDivisionsRelations = relations(brandDivisions, ({ one }) => ({
  author: one(users, {
    fields: [brandDivisions.authorId],
    references: [users.id],
  }),
}));

export const blogCategoriesRelations = relations(blogCategories, ({ many }) => ({
  posts: many(blogPostCategories),
}));

export const blogPostCategoriesRelations = relations(blogPostCategories, ({ one }) => ({
  post: one(blogPosts, {
    fields: [blogPostCategories.postId],
    references: [blogPosts.id],
  }),
  category: one(blogCategories, {
    fields: [blogPostCategories.categoryId],
    references: [blogCategories.id],
  }),
}));

// Export all tables
export const tables = {
  users,
  blogPosts,
  blogComments,
  brandDivisions,
  blogCategories,
  blogPostCategories,
};

// Export all schemas
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type BlogComment = typeof blogComments.$inferSelect;
export type NewBlogComment = typeof blogComments.$inferInsert;
export type BrandDivision = typeof brandDivisions.$inferSelect;
export type NewBrandDivision = typeof brandDivisions.$inferInsert;
export type BlogCategory = typeof blogCategories.$inferSelect;
export type NewBlogCategory = typeof blogCategories.$inferInsert;
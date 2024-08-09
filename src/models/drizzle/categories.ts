import { relations } from "drizzle-orm";
import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { categoriesPosts } from "./categories-posts";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description"),
  createdAt: date("created_at").defaultNow().notNull(),
  updatedAt: date("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});

export const categoriesToCategoriesPostsRelation = relations(
  categories,
  ({ many }) => ({
    posts: many(categoriesPosts),
  })
);

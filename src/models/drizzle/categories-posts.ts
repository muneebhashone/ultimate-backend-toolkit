import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { posts } from "./posts";

export const categoriesPosts = pgTable(
  "categories_posts",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, {
        onDelete: "cascade",
      }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, {
        onDelete: "cascade",
      }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.categoryId] }),
  })
);

export const categoriesPostsRelation = relations(
  categoriesPosts,
  ({ one }) => ({
    post: one(posts, {
      fields: [categoriesPosts.postId],
      references: [posts.id],
    }),
    category: one(categories, {
      fields: [categoriesPosts.categoryId],
      references: [categories.id],
    }),
  })
);

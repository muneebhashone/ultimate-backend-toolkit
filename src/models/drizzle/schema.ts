import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

import { pgEnum } from "drizzle-orm/pg-core";
import { permissionEnums, rolesEnums, statusEnums } from "../../schema/enums";

export const rolePgEnum = pgEnum("ROLE", rolesEnums);
export const statusPgEnum = pgEnum("USER_STATUS", statusEnums);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").unique().notNull(),
  username: varchar("username").notNull(),
  phoneNo: varchar("phone_no"),
  avatar: varchar("avatar"),
  role: rolePgEnum("role").notNull().default("CLIENT_SUPER_USER"),
  isActive: boolean("is_active").default(false),
  password: varchar("password").notNull(),
  passwordResetToken: varchar("password_reset_token"),
  setPasswordToken: varchar("set_password_token"),
  status: statusPgEnum("status").notNull(),
  permissions: text("permissions", {
    enum: permissionEnums,
  }).array(),
  createdAt: date("created_at").defaultNow().notNull(),
  updatedAt: date("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});

export const userToPostsRelation = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: varchar("description"),
  content: text("content").notNull(),
  status: statusPgEnum("status").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  createdAt: date("created_at").defaultNow(),
  updatedAt: date("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});

export const postsRelation = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  categories: many(categoriesPosts),
}));

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description"),
  createdAt: date("created_at").defaultNow().notNull(),
  updatedAt: date("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(categoriesPosts),
}));

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

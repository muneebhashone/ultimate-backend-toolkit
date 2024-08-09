import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { permissionEnums } from "../../enums";
import { posts } from "./posts";
import { rolePgEnum, statusPgEnum } from "./enums";

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

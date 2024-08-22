import { InferSelectModel } from "drizzle-orm";
import { builder } from "../builder";
import { users } from "../models/drizzle/schema";

export interface IUser extends InferSelectModel<typeof users> {}

export const User = builder.objectRef<IUser>("User").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    username: t.exposeString("username"),
    email: t.exposeString("email"),
    createdAt: t.exposeString("createdAt"),
    updatedAt: t.exposeString("updatedAt"),
  }),
});

export const CreateUserInput = builder.inputType("CreateUser", {
  fields: (t) => ({
    email: t.field({ type: "Email", required: true }),
    password: t.string({ required: true }),
    username: t.string({ required: true }),
  }),
});

export type ICreateUserInput = typeof CreateUserInput.$inferInput;

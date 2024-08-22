import { builder } from "../builder";
import { IPost } from "../types";
import { Category } from "./category";
import { StatusGraphQLEnum } from "./enums";
import { User } from "./user";

export const Post = builder.objectRef<IPost>("Post").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    content: t.exposeString("content"),
    createdAt: t.exposeString("createdAt"),
    updatedAt: t.exposeString("updatedAt"),
    categories: t.field({
      type: t.listRef(Category),
      resolve: async (parent) => {
        return parent.categories;
      },
    }),
    user: t.field({
      type: User,
      resolve: async (parent) => {
        return parent.user;
      },
    }),
  }),
});

export const CreatePostInput = builder.inputType("CreatePost", {
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string({ required: true }),
    userId: t.int({ required: true }),
    status: t.field({ type: StatusGraphQLEnum, required: true }),
    categoryId: t.intList({ required: true }),
    description: t.string({ required: true }),
  }),
});

export type ICreatePostInput = typeof CreatePostInput.$inferInput;

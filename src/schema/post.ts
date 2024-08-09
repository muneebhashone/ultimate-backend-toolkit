import { builder } from "../builder";
import { IPost, ICreatePost } from "../types";
import { CategoryRef } from "./category";
import { StatusGraphQLEnum } from "./enums";
import { UserRef } from "./user";

export const PostRef = builder.objectRef<IPost>("Post");
export const CreatePostInputRef = builder.inputRef<ICreatePost>("CreatePost");

PostRef.implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    content: t.exposeString("content"),
    createdAt: t.exposeString("createdAt"),
    updatedAt: t.exposeString("updatedAt"),
    categories: t.field({
      type: t.listRef(CategoryRef),
      resolve: async (parent) => {
        return parent.categories;
      },
    }),
    user: t.field({
      type: UserRef,
      resolve: async (parent) => {
        return parent.user;
      },
    }),
  }),
});

CreatePostInputRef.implement({
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string({ required: true }),
    userId: t.int({ required: true }),
    status: t.field({ type: StatusGraphQLEnum, required: true }),
    categoryId: t.intList({ required: true }),
    description: t.string({ required: true }),
  }),
});

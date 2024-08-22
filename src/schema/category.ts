import { InferSelectModel } from "drizzle-orm";
import { builder } from "../builder";
import { categories } from "../models/drizzle/schema";

export interface ICategory extends InferSelectModel<typeof categories> {}

export const Category = builder.objectRef<ICategory>("Category").implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description"),
    createdAt: t.exposeString("createdAt"),
    updatedAt: t.exposeString("updatedAt"),
  }),
});

export const CreateCategoryInput = builder.inputType("CreateCategory", {
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string(),
  }),
});

export const CreateCategoryBulkInput = builder.inputType("CreateCategoryBulk", {
  fields: (t) => ({
    categories: t.field({
      type: t.listRef(CreateCategoryInput),
      required: true,
    }),
  }),
});

export type ICreateCategoryInput = typeof CreateCategoryInput.$inferInput;
export type ICreateCategoryBulkInput =
  typeof CreateCategoryBulkInput.$inferInput;

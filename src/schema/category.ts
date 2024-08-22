import { builder } from "../builder";
import { ICategory } from "../types";

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

export type ICreateCategoryInput = typeof CreateCategoryInput.$inferInput;

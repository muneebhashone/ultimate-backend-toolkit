import { builder } from "../builder";
import { ICategory, ICreateCategory } from "../types";

export const CategoryRef = builder.objectRef<ICategory>("Category");
export const CreateCategoryInputRef =
  builder.inputRef<ICreateCategory>("CreateCategory");

CategoryRef.implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description"),
    createdAt: t.exposeString("createdAt"),
    updatedAt: t.exposeString("updatedAt"),
  }),
});

CreateCategoryInputRef.implement({
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string(),
  }),
});

import { GraphQLError } from "graphql";
import { builder } from "../builder";
import { CreateCategoryInputRef, CategoryRef } from "../schema/category";
import { createCategory, fetchCategories } from "../services/categories";

builder.queryField("categories", (t) =>
  t.field({
    type: t.listRef(CategoryRef),
    resolve: async () => {
      return fetchCategories();
    },
  })
);

builder.mutationField("createCategory", (t) =>
  t.field({
    type: CategoryRef,
    args: {
      input: t.arg({ type: CreateCategoryInputRef, required: true }),
    },
    resolve: async (_, { input }) => {
      try {
        const category = await createCategory(input);

        return category;
      } catch (err) {
        throw new GraphQLError((err as Error).message);
      }
    },
  })
);

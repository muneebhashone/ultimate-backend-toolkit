import { builder } from "../builder";
import {
  Category,
  CreateCategoryInput,
  CreatePostInput,
  CreateUserInput,
  LoginUserInput,
  LoginUserReturn,
  Post,
  User,
} from "../schema";
import { loginUser } from "../services/auth";
import { createCategory } from "../services/categories";
import { createPost } from "../services/post";
import { createUser } from "../services/user";
import { wrapResolver } from "../utils/graphqlUtil";

builder.mutationField("createPost", (t) =>
  t.field({
    type: Post,
    args: {
      input: t.arg({ type: CreatePostInput, required: true }),
    },
    resolve: wrapResolver(async (_, { input }) => {
      const post = await createPost(input);
      return post;
    }),
  })
);

builder.mutationField("createUser", (t) =>
  t.field({
    type: User,
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: wrapResolver(async (_, { input }) => {
      const user = await createUser(input);
      return user;
    }),
  })
);

builder.mutationField("createCategory", (t) =>
  t.field({
    type: Category,
    args: {
      input: t.arg({ type: CreateCategoryInput, required: true }),
    },
    resolve: wrapResolver(async (_, { input }) => {
      const category = await createCategory(input);
      return category;
    }),
  })
);

builder.mutationField("loginUser", (t) =>
  t.field({
    type: LoginUserReturn,
    args: {
      input: t.arg({ type: LoginUserInput, required: true }),
    },
    resolve: wrapResolver(async (_, { input }) => {
      return loginUser(input);
    }),
  })
);

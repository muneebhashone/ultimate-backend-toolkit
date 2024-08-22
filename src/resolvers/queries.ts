import { builder } from "../builder";
import { Category, Post, User } from "../schema";
import { fetchCategories } from "../services/categories";
import { fetchPosts } from "../services/post";
import { fetchUser, fetchUsers } from "../services/user";
import { wrapResolver } from "../utils/graphqlUtil";

builder.queryField("posts", (t) =>
  t.field({
    type: t.listRef(Post),
    resolve: wrapResolver(async () => {
      return fetchPosts();
    }),
  })
);

builder.queryField("categories", (t) =>
  t.field({
    type: t.listRef(Category),
    resolve: wrapResolver(async () => {
      return fetchCategories();
    }),
  })
);

builder.queryField("users", (t) =>
  t.field({
    type: t.listRef(User),
    resolve: wrapResolver(async () => {
      return fetchUsers();
    }),
  })
);

builder.queryField("user", (t) =>
  t.field({
    type: User,
    args: {
      userId: t.arg({ type: "ID", required: true }),
    },
    resolve: wrapResolver(async (_, { userId }) => {
      return fetchUser(userId);
    }),
  })
);

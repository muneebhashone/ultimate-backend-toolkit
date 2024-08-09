import { GraphQLError } from "graphql";
import { builder } from "../builder";
import { CreatePostInputRef, PostRef } from "../schema/post";
import { fetchPosts, createPost } from "../services/post";

builder.queryField("posts", (t) =>
  t.field({
    type: t.listRef(PostRef),
    resolve: async () => {
      return fetchPosts();
    },
  })
);

builder.mutationField("createPost", (t) =>
  t.field({
    type: PostRef,
    args: {
      input: t.arg({ type: CreatePostInputRef, required: true }),
    },
    resolve: async (_, { input }) => {
      try {
        const post = await createPost(input);

        return post;
      } catch (err) {
        throw new GraphQLError((err as Error).message);
      }
    },
  })
);

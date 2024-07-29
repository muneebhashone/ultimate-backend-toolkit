import { GraphQLError } from "graphql";
import { builder } from "../builder";
import { CreateUserInputRef, UserRef } from "../schema/user";
import { fetchUsers, fetchUser, createUser } from "../services/user";

builder.queryField("users", (t) =>
  t.field({
    type: t.listRef(UserRef),
    resolve: async () => {
      return fetchUsers();
    },
  })
);

builder.queryField("user", (t) =>
  t.field({
    type: UserRef,
    args: {
      userId: t.arg({ type: "ID", required: true }),
    },
    resolve: async (_, { userId }) => {
      return fetchUser(userId);
    },
  })
);

builder.mutationField("createUser", (t) =>
  t.field({
    type: UserRef,
    args: {
      input: t.arg({ type: CreateUserInputRef, required: true }),
    },
    resolve: async (_, { input }) => {
      try {
        const user = await createUser(input);

        return user;
      } catch (err) {
        throw new GraphQLError((err as Error).message);
      }
    },
  })
);

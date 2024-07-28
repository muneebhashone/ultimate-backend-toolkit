import { GraphQLError } from "graphql";
import { builder } from "../builder";
import { createUser, fetchUsers } from "../services/user";
import { ICreateUser, IUser } from "../types";

export const UserRef = builder.objectRef<IUser>("User");
export const CreateUserInputRef = builder.inputRef<ICreateUser>("CreateUser");

UserRef.implement({
  fields: (t) => ({
    id: t.exposeString("_id"),
    username: t.exposeString("username"),
    email: t.exposeString("email"),
    createdAt: t.field({ type: "Date", resolve: (parent) => parent.createdAt }),
    updatedAt: t.field({ type: "Date", resolve: (parent) => parent.updatedAt }),
  }),
});

CreateUserInputRef.implement({
  fields: (t) => ({
    email: t.field({ type: "Email", required: true }),
    password: t.string({ required: true }),
    username: t.string({ required: true }),
  }),
});

builder.queryField("users", (t) =>
  t.field({
    type: t.listRef(UserRef),
    resolve: async () => {
      return fetchUsers();
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

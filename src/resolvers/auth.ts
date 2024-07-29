import { GraphQLError } from "graphql";
import { builder } from "../builder";
import { LoginUserInputRef, LoginUserReturnRef } from "../schema/auth";
import { loginUser } from "../services/auth";

builder.mutationField("loginUser", (t) =>
  t.field({
    type: LoginUserReturnRef,
    args: {
      input: t.arg({ type: LoginUserInputRef, required: true }),
    },
    resolve: async (_, { input }) => {
      try {
        return loginUser(input);
      } catch (err) {
        throw new GraphQLError((err as Error).message);
      }
    },
  })
);

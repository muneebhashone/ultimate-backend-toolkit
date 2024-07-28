import { GraphQLError } from "graphql";
import { builder } from "../builder";
import { loginUser } from "../services/auth";
import { LoginUser, LoginUserReturn } from "../types";

export const LoginUserReturnRef =
  builder.objectRef<LoginUserReturn>("LoginUserReturn");

export const LoginUserInputRef = builder.inputRef<LoginUser>("LoginUserInput");

LoginUserReturnRef.implement({
  fields: (t) => ({
    accessToken: t.exposeString("accessToken"),
    refreshToken: t.exposeString("refreshToken"),
  }),
});

LoginUserInputRef.implement({
  fields: (t) => ({
    email: t.field({ required: true, type: "Email" }),
    password: t.string({ required: true }),
    rememberMe: t.boolean({ required: true }),
  }),
});

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

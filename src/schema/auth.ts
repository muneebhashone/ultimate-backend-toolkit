import { builder } from "../builder";
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

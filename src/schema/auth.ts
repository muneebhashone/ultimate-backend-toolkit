import { builder } from "../builder";

export interface ILoginUserReturn {
  accessToken: string;
  refreshToken: string;
}

export const LoginUserReturn = builder
  .objectRef<ILoginUserReturn>("LoginUserReturn")
  .implement({
    fields: (t) => ({
      accessToken: t.exposeString("accessToken"),
      refreshToken: t.exposeString("refreshToken"),
    }),
  });

export const LoginUserInput = builder.inputType("LoginUserInput", {
  fields: (t) => ({
    email: t.field({ required: true, type: "Email" }),
    password: t.string({ required: true }),
    rememberMe: t.boolean({ required: true }),
  }),
});

export type ILoginUserInput = typeof LoginUserInput.$inferInput;

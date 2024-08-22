import { ILoginUserInput, ILoginUserReturn } from "../schema";
import { signJwt, verifyPassword } from "../utils/security";
import { findUserByEmail } from "./user";

export const loginUser = async (
  payload: ILoginUserInput
): Promise<ILoginUserReturn> => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!(await verifyPassword(user.password, payload.password))) {
    throw new Error("Password isn't valid");
  }

  const accessToken = await signJwt(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    { expiresIn: payload.rememberMe ? "30d" : "1d" }
  );

  const refreshToken = await signJwt(
    {
      id: user.id,
    },
    { expiresIn: payload.rememberMe ? "45d" : "7d" }
  );

  return {
    accessToken,
    refreshToken,
  };
};

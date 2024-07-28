import User from "../models/user";
import { LoginUser, LoginUserReturn } from "../types";
import { signJwt, verifyPassword } from "../utils/security";

export const loginUser = async (
  payload: LoginUser
): Promise<LoginUserReturn> => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!(await verifyPassword(user.password, payload.password))) {
    throw new Error("Password isn't valid");
  }

  const accessToken = await signJwt(
    {
      _id: user.id,
      email: user.email,
      username: user.username,
    },
    { expiresIn: payload.rememberMe ? "30d" : "1d" }
  );

  const refreshToken = await signJwt(
    {
      _id: user.id,
    },
    { expiresIn: payload.rememberMe ? "45d" : "7d" }
  );

  return {
    accessToken,
    refreshToken,
  };
};

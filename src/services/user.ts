import User from "../models/user";
import { ICreateUser, IUser } from "../types";
import { hashPassword } from "../utils/security";

export const createUser = async (payload: ICreateUser): Promise<IUser> => {
  const userExist = await User.findOne({ email: payload.email });

  if (userExist) {
    throw new Error("User with same email address already exist");
  }

  const password = await hashPassword(payload.password);

  const user = new User({ ...payload, password: password });

  await user.save();

  return user.toObject();
};
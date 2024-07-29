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

export const fetchUsers = async (): Promise<IUser[]> => {
  const users = await User.find({});

  return users;
};

export const fetchUser = async (userId: string): Promise<IUser> => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new Error("User not found");
  }

  return user?.toObject();
};

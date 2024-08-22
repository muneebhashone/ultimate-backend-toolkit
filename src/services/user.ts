import { eq } from "drizzle-orm";
import { db } from "../lib/drizzle";
import { users } from "../models/drizzle/schema";
import { hashPassword } from "../utils/security";
import { ICreateUserInput, IUser } from "../schema";

export const createUser = async (payload: ICreateUserInput): Promise<IUser> => {
  const userExist = await db.query.users.findFirst({
    where: eq(users.email, payload.email),
  });

  if (userExist) {
    throw new Error("User with same email address already exist");
  }

  const password = await hashPassword(payload.password);

  const user = await db
    .insert(users)
    .values({ ...payload, password: password, status: "APPROVED" })
    .returning()
    .execute();

  return user[0];
};

export const fetchUsers = async (): Promise<IUser[]> => {
  const users = await db.query.users.findMany();

  return users;
};

export const fetchUser = async (userId: string): Promise<IUser> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, Number(userId)),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const findUserByEmail = async (email: string): Promise<IUser> => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

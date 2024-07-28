import argon2 from "argon2";
import { sign, SignOptions, verify } from "jsonwebtoken";
import { IUser } from "../types";
import { jwtConfig } from "../core/config";

export const hashPassword = async (password: string): Promise<string> => {
  return argon2.hash(password);
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string
): Promise<boolean> => {
  return argon2.verify(hashedPassword, password);
};

export const signJwt = async (
  payload: Partial<IUser>,
  options?: SignOptions
): Promise<string> => {
  return sign(payload, jwtConfig.JWT_SECRET, options);
};

export const verifyJwt = async (jwt: string): Promise<Partial<IUser>> => {
  return verify(jwt, jwtConfig.JWT_SECRET) as Partial<IUser>;
};

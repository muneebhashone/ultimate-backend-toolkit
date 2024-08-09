import { InferSelectModel } from "drizzle-orm";
import { posts } from "../../models/drizzle";
import { IUser } from "./user";
import { ICategory } from "./category";

export interface IPost extends InferSelectModel<typeof posts> {
  user: IUser;
  categories: ICategory[];
}
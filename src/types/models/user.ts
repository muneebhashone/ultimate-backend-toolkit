import { InferSelectModel } from "drizzle-orm";
import { users } from "../../models/drizzle";

export interface IUser extends InferSelectModel<typeof users> {}

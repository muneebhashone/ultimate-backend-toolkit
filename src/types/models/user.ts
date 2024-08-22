import { InferSelectModel } from "drizzle-orm";
import { users } from "../../models/drizzle/schema";

export interface IUser extends InferSelectModel<typeof users> {}

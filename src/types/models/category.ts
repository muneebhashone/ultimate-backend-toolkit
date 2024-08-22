import { InferSelectModel } from "drizzle-orm";
import { categories } from "../../models/drizzle/schema";

export interface ICategory extends InferSelectModel<typeof categories> {}

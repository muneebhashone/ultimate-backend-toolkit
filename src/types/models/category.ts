import { InferSelectModel } from "drizzle-orm";
import { categories } from "../../models/drizzle";

export interface ICategory extends InferSelectModel<typeof categories> {}

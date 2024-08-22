import { db } from "../lib/drizzle";
import { categories } from "../models/drizzle/schema";
import {
  ICategory,
  ICreateCategoryBulkInput,
  ICreateCategoryInput,
} from "../schema";

export const createCategory = async (
  payload: ICreateCategoryInput
): Promise<ICategory> => {
  const category = await db
    .insert(categories)
    .values(payload)
    .returning()
    .execute();

  return category[0];
};

export const createCategoryBulk = async (
  payload: ICreateCategoryBulkInput
): Promise<ICategory[]> => {
  const categoriesAdded = await db
    .insert(categories)
    .values(payload.categories)
    .returning()
    .execute();

  return categoriesAdded;
};

export const fetchCategories = async (): Promise<ICategory[]> => {
  const categories = await db.query.categories.findMany();

  return categories;
};

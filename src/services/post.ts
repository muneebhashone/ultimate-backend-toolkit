import { asc, eq, getTableColumns, sql } from "drizzle-orm";
import app from "../core/app";
import { db } from "../lib/drizzle";
import {
  categories,
  categoriesPosts,
  posts,
  users,
} from "../models/drizzle/schema";
import { ICategory, ICreatePostInput, IPost } from "../schema";

export const createPost = async (payload: ICreatePostInput): Promise<IPost> => {
  const insertedPost = await db
    .insert(posts)
    .values(payload)
    .returning({ id: posts.id })
    .execute();

  app.log.info("insertedPost: " + JSON.stringify(insertedPost));

  const postId = insertedPost[0].id;

  const categoriesPostInsertPromises = payload.categoryId.map(
    async (categoryId) => {
      await db.insert(categoriesPosts).values({
        categoryId: categoryId,
        postId: postId,
      });
    }
  );

  await Promise.all(categoriesPostInsertPromises);

  const post = await db
    .select({
      ...getTableColumns(posts),
      categories: sql<
        ICategory[]
      >`json_agg(json_build_object('name', ${categories.name}, 'id', ${categories.id}, 'updatedAt', ${categories.updatedAt}, 'createdAt', ${categories.createdAt}, 'description', ${categories.description}))`,
      user: users,
    })
    .from(posts)
    .leftJoin(users, eq(users.id, posts.userId))
    .leftJoin(categoriesPosts, eq(posts.id, categoriesPosts.postId))
    .leftJoin(categories, eq(categoriesPosts.categoryId, categories.id))
    .groupBy(posts.id, users.id, users.username)
    .where(eq(posts.id, postId));

  return post[0] as IPost;
};

export const fetchPosts = async (): Promise<IPost[]> => {
  const postsFetched = await db
    .select({
      ...getTableColumns(posts),
      categories: sql<
        ICategory[]
      >`json_agg(json_build_object('name', ${categories.name}, 'id', ${categories.id}, 'updatedAt', ${categories.updatedAt}, 'createdAt', ${categories.createdAt}, 'description', ${categories.description}))`,
      user: users,
    })
    .from(posts)
    .leftJoin(users, eq(users.id, posts.userId))
    .leftJoin(categoriesPosts, eq(posts.id, categoriesPosts.postId))
    .leftJoin(categories, eq(categoriesPosts.categoryId, categories.id))
    .groupBy(posts.id, users.id, users.username)
    .orderBy(asc(posts.id))
    .limit(10)
    .offset(0);

  return postsFetched as IPost[];
};

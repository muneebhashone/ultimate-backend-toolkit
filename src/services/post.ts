import { asc, eq, getTableColumns, sql } from "drizzle-orm";
import app from "../core/app";
import { db } from "../lib/drizzle";
import {
  categories,
  categoriesPosts,
  posts,
  users,
} from "../models/drizzle/schema";
import { ICategory } from "../types";
import { IPost } from "../types/models/post";
import { ICreatePost } from "../types/services/post";

export const createPost = async (payload: ICreatePost): Promise<IPost> => {
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

  const post = (
    await db.execute(sql`
      SELECT 
          ${posts}.*, 
          json_build_object('username', ${users.username}, 'id',  ${users.id}) as user,
          json_agg(json_build_object('name', ${categories.name}, 'id',  ${categories.id}, 'updatedAt',  ${categories.updatedAt}, 'createdAt', ${categories.createdAt}, 'description', ${categories.description})) AS ${categories}
      FROM ${posts}
      LEFT JOIN ${users} ON ${posts.userId} = ${users.id}
      LEFT JOIN ${categoriesPosts} ON ${posts.id} = ${categoriesPosts.postId}
      LEFT JOIN ${categories} ON ${categoriesPosts.categoryId} = ${categories.id}
      WHERE ${posts.id} = ${postId}
      GROUP BY ${posts.id}, ${users.id}, ${users.username}
      LIMIT 1;
  `)
  )[0] as unknown as IPost;

  return post;
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

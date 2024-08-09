import { z } from "zod";

const configSchema = z.object({
  MONGO_DATABASE_URL: z.string().url(),
  POSTGRES_DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  PORT: z.string().default("3000").transform(Number),
});

const jwtConfigSchema = z.object({
  JWT_SECRET: z.string(),
});

export const jwtConfig = jwtConfigSchema.parse(process.env);

export default configSchema.parse(process.env);

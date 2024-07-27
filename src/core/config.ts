import { z } from "zod";

const configSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().default("3000").transform(Number),
});

const jwtConfigSchema = z.object({
  JWT_SECRET: z.string(),
});

export const jwtConfig = jwtConfigSchema.parse(process.env);

export default configSchema.parse(process.env);

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/models/drizzle/schema.ts",
  out: "./migrations",
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.POSTGRES_DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});

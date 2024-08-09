import postgres from "postgres";

export const postgresConnection = postgres(
  String(process.env.POSTGRES_DATABASE_URL)
);

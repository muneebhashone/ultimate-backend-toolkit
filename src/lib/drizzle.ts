import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../models/drizzle";
import { postgresConnection } from "./postgres";

export const db = drizzle(postgresConnection, { schema });

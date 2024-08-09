import { pgEnum } from "drizzle-orm/pg-core";
import { rolesEnums, statusEnums } from "../../enums";

export const rolePgEnum = pgEnum("ROLE", rolesEnums);
export const statusPgEnum = pgEnum("USER_STATUS", statusEnums);

import { builder } from "../builder";
import { statusEnums } from "../enums";

export const StatusGraphQLEnum = builder.enumType("Status", {
  values: statusEnums,
});

import "./schema";
import "./resolvers";

import { builder } from "./builder";

const schema = builder.toSchema();
export default schema;

import SchemaBuilder from "@pothos/core";
import {
  DateResolver,
  DateTimeResolver,
  EmailAddressResolver,
} from "graphql-scalars";

export const builder = new SchemaBuilder<{
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    Date: {
      Input: Date;
      Output: Date;
    };
    Email: {
      Input: string;
      Output: string;
    };
  };
}>({});

builder.addScalarType("DateTime", DateTimeResolver, {});
builder.addScalarType("Date", DateResolver, {});
builder.addScalarType("Email", EmailAddressResolver, {});

builder.queryType({});
builder.mutationType({});

import { SchemaTypes } from "@pothos/core";
import { GraphQLError, GraphQLResolveInfo } from "graphql";

export function wrapResolver<
  TParent,
  TArgs,
  TContext extends SchemaTypes["Context"],
  TReturn
>(
  resolver: (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ) => Promise<TReturn>
) {
  return async (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ): Promise<TReturn> => {
    try {
      return await resolver(parent, args, context, info);
    } catch (err) {
      throw new GraphQLError((err as Error).message);
    }
  };
}

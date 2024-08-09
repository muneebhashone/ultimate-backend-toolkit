import app from "./core/app";
import config from "./core/config";
import { mongodbConnection as connectMongoDb } from "./lib/mongodb";
import { pingRedis } from "./lib/redis";

const start = async () => {
  try {
    await connectMongoDb();
    await pingRedis();

    await app.listen({ port: config.PORT });

    const address = app.server.address();
    const port = typeof address === "string" ? address : address?.port;

    app.log.info(`GraphiQL playground at http://localhost:${port}/graphiql`);
  } catch (err) {
    app.log.error((err as Error).message);
    process.exit(1);
  }
};

start();

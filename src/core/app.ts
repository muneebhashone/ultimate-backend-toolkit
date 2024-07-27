import Fastify, { FastifyInstance } from "fastify";
import mercurius from "mercurius";
import schema from "../schema";

const app: FastifyInstance = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

app.register(mercurius, {
  schema: schema,
  graphiql: true,
});

export default app;

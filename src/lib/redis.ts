import Redis from "ioredis";
import config from "../core/config";
import app from "../core/app";

export const redis = new Redis(config.REDIS_URL);

export const pingRedis = async () => {
  try {
    const pingResponse = await redis.ping();
    if (pingResponse === "PONG") {
      app.log.info(`Redis connected: ${JSON.stringify(pingResponse)}`);
    } else {
      app.log.error(JSON.stringify(pingResponse));
      process.exit(1);
    }
  } catch (err) {
    app.log.error((err as Error).message);
    process.exit(1);
  }
};

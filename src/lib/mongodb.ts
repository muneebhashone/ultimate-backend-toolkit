import mongoose from "mongoose";
import config from "../core/config";
import app from "../core/app";

export const mongodbConnection = async () => {
  try {
    await mongoose.connect(config.MONGO_DATABASE_URL);
    app.log.info("Database connected");
  } catch (err) {
    app.log.error((err as Error).message);
    process.exit(1);
  }
};

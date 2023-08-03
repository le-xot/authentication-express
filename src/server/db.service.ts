import mongoose from "mongoose";
import environment from "../services/environment.service";

async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(environment.mongoUri);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);

    throw error;
  }
}

export { connectDatabase };

import dotenv from "dotenv";

dotenv.config();

export default {
  applicationPort: Number(process.env.APPLICATION_PORT || 3000),
  secretTokenAccess: process.env.SECRET_TOKEN_ACCESS,
  secretTokenRefresh: process.env.SECRET_TOKEN_REFRESH,
  devToken: process.env.DEV_TOKEN,
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb://localhost:27017/authentification-express",
};


import jwt, { Secret } from "jsonwebtoken";
import { client } from "../server/redis.service";
import dotenv from "dotenv";
import environment from "./environment.service";

dotenv.config();

interface User {
  username: string;
}

function generateTokens(user: User): {
  accessToken: string;
  refreshToken: string;
} {
  const secretTokenAccess: Secret = process.env.SECRET_TOKEN_ACCESS || "";
  const secretTokenRefresh: Secret = process.env.SECRET_TOKEN_REFRESH || "";

  const accessToken = jwt.sign({ user }, secretTokenAccess, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ user }, secretTokenRefresh, {
    expiresIn: "7d",
  });

  client.set(refreshToken, user.username, "EX", 7 * 24 * 60 * 60);

  return { accessToken, refreshToken };
}

export { generateTokens };

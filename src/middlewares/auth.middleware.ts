import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { client } from "../server/redis.service";
import { generateTokens } from "../services/generateTokens";
import { User } from "../repositories/user.repository";
import dotenv from "dotenv";

dotenv.config();

async function authMiddleware(
  Request: { cookies: { accessToken: string; refreshToken: string } },
  Response: {
    clearCookie: (arg0: string) => void;
    cookie: (arg0: string, arg1: any) => void;
    redirect: (arg0: string) => void | PromiseLike<void>;
  },
  NextFunction: () => void | PromiseLike<void>
): Promise<void> {
  const accessToken: string = Request.cookies.accessToken;
  const refreshToken: string = Request.cookies.refreshToken;
  const secretTokenAccess: Secret = process.env.SECRET_TOKEN_ACCESS || "";

  if (
    accessToken &&
    secretTokenAccess &&
    jwt.verify(accessToken, secretTokenAccess)
  ) {
    return NextFunction();
  } else if (accessToken === undefined && refreshToken) {
    const username: string | null = await client.get(refreshToken);
    if (username) {
      const user = await User.findOne({ username: username });
      if (user) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          generateTokens(user);
        Response.clearCookie("accessToken");
        Response.clearCookie("refreshToken");
        Response.cookie("accessToken", newAccessToken);
        Response.cookie("refreshToken", newRefreshToken);
        return NextFunction();
      }
    }
  }
  return Response.redirect("/login");
}

export default authMiddleware;

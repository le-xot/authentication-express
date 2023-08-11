import express, { Router, Request, Response } from "express";
import { client } from "../server/redis.service";
import { User } from "../repositories/user.repository";
import { generateTokens } from "../services/generateTokens";

const router = express.Router();

router.get("/", async (Request, Response) => {
  const accessToken: string = Request.cookies.accessToken;
  const refreshToken: string = Request.cookies.refreshToken;
  if (accessToken === undefined && refreshToken) {
    const username = await client.get(refreshToken);
    if (username) {
      const user = await User.findOne({ username: username });
      if (user) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          generateTokens(user);
        Response.cookie("accessToken", newAccessToken);
        Response.cookie("refreshToken", newRefreshToken);
        return;
      }
    }
  }
});

export default router;

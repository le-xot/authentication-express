import express, { Request, Response } from "express";
import path from "path";
import { login } from "../services/login.service";
import { generateTokens } from "../services/generateTokens";

const router = express.Router();

router.get("/", (Request, Response) => {
  Response.sendFile(path.join(__dirname, "../static/login.html"));
});

router.get("/denied", (Request, Response) => {
  Response.sendFile(path.join(__dirname, "../static/denied.html"));
});

router.post("/", async (Request, Response) => {
  const { username, password } = Request.body;
  const user = await login(username, password);

  if (user) {
    const { accessToken, refreshToken } = generateTokens(user);

    Response.cookie("accessToken", accessToken);
    Response.cookie("refreshToken", refreshToken);
    return Response.redirect("/admin");
  }

  return Response.redirect("/login/denied");
});

export default router;

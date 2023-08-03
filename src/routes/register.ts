import express, { Request, Response } from "express";
import path from "path";
import { register } from "../services/register.service";
import { generateTokens } from "../services/generateTokens";

const router = express.Router();

router.get("/", (Request, Response) => {
  Response.sendFile(path.join(__dirname, "../static/register.html"));
});

router.get("/warning", (Request, Response) => {
  Response.sendFile(path.join(__dirname, "../static/warning.html"));
});

router.post("/", async (Request, Response) => {
  const { username, password } = Request.body;
  const newUser = await register(username, password);

  if (newUser) {
    const { refreshToken } = generateTokens(newUser);

    Response.cookie("refreshToken", refreshToken);

    return Response.redirect("/login");
  }
  return Response.redirect("/register/warning");
});

export default router;

import express, { Router, Request, Response } from "express";
import path from "path";
import { deleteUsers, getUsers } from "../repositories/user.repository";
import authMiddleware from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.get("/", authMiddleware, (Request, Response) => {
  Response.sendFile(path.join(__dirname, "../static/admin.html"));
});

router.get("/api/users", authMiddleware, async (Request, Response) => {
  const users = await getUsers();
  Response.json(users);
});

router.get("/exit", (Request, Response) => {
  Response.clearCookie("accessToken");
  Response.clearCookie("refreshToken");
  Response.redirect("/");
});

router.post("/delete", authMiddleware, async (Request, Response) => {
  await deleteUsers();
  Response.redirect("/admin");
});

export default router;

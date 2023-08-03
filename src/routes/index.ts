import express, { Router, Request, Response } from "express";
import path from "path";

const router: Router = express.Router();

router.get("/", (Request, Response) => {
  Response.sendFile(path.join(__dirname, "../static/index.html"));
});

export default router;

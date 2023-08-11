import jwt, { Secret } from "jsonwebtoken";
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
  const secretTokenAccess: Secret = process.env.SECRET_TOKEN_ACCESS || "";

  if (accessToken && jwt.verify(accessToken, secretTokenAccess)) {
    return NextFunction();
  }
  return Response.redirect("/login");
}

export default authMiddleware;

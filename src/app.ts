import express from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index";
import adminRouter from "./routes/admin";
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import refreshRouter from "./routes/refresh";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/refresh", refreshRouter);

export default app;

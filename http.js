const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Подключение маршрутов
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const loginRouter = require("./routes/login");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Использование маршрутов
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use(loginRouter);

// Запуск сервера
module.exports = app;

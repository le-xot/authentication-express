const express = require("express");
const app = express();

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

module.exports = app;

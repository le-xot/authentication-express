const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/login", (req, res) => {
  res.send(`
  <h2>Авторизация</h2>
  <form action="/login" method="POST">
    <div>
      <label for="username">Имя пользователя:</label>
    </div>
    <input type="text" id="username" name="username" required>
    <div>
      <label for="password">Пароль:</label>
    </div>
    <input type="password" id="password" name="password" required>
    <button type="submit">Войти</button>
  </form>
`);
});

router.post("/login", (req, res) => {
  const token = jwt.sign("token", "secret");
  res.cookie("accesstoken", token, { maxAge: 900000, httpOnly: true });
  res.redirect("/admin");
});

router.get("/register", (req, res) => {
  res.send(`
  <h2>Авторизация</h2>
  <form action="/login" method="POST">
    <div>
      <label for="username">Имя пользователя:</label>
    </div>
    <input type="text" id="username" name="username" required>
    <div>
      <label for="password">Пароль:</label>
    </div>
    <input type="password" id="password" name="password" required>
    <button type="submit">Регистрация</button>
  </form>
`);
});

module.exports = router;

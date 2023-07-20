const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const db = require("../db.js");
require("dotenv").config();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/login.html"));
});

router.get("/denied", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/denied.html"));
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({
    username: username,
    password: password,
  }).exec();
  if (user !== null) {
    const token = jwt.sign(
      { username: user.username, password: user.password },
      process.env.SECRET_TOKEN
    );
    res.cookie("accesstoken", token, { maxAge: 86400, httpOnly: true });
    res.redirect("/admin");
  } else {
    res.redirect("/login/denied");
  }
});

module.exports = router;

// function generateJwtToken(payload, secret) {
//   const token = jwt.sign(payload, secret);
//   return token;
// }

// const token = generateJwtToken(
//   { username: req.body.username, password: req.body.password },
//   process.env.SECRET_TOKEN
// );
// res.cookie("accesstoken", token, { maxAge: 604800000, httpOnly: true });

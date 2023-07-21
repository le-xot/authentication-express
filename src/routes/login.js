const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db.js");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/login.html"));
});

router.get("/denied", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/denied.html"));
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({
    username: username,
    password: password,
  }).exec();
  if (user !== null) {
    res.redirect("/admin");
  } else {
    res.redirect("/login/denied");
  }
});

module.exports = router;

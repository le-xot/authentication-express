const express = require("express");
const router = express.Router();
const path = require("path");
const { login } = require("../services/login.service.js");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/login.html"));
});
router.get("/denied", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/denied.html"));
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  (await login(username, password))
    ? res.redirect("/admin")
    : res.redirect("/login/denied");
});

module.exports = router;

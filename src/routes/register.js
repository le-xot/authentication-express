const express = require("express");
const router = express.Router();
const path = require("path");
const { register } = require("../services/register.service.js");
const {
  generationRefreshToken,
} = require("../services/generationRefreshToken.js");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/register.html"));
});
router.get("/warning", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/warning.html"));
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const newUser = await register(username, password);
  if (newUser) {
    generationRefreshToken(newUser);
    return res.redirect("/login");
  }
  return res.redirect("/register/warning");
});

module.exports = router;

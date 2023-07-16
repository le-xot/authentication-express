const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/register.html"));
});

router.post("/register", (req, res) => {
  const token = jwt.sign("token", "secret");
  res.cookie("accesstoken", token, { maxAge: 900000, httpOnly: true });
  res.redirect("/admin");
});

module.exports = router;

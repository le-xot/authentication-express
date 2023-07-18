const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");

function generateJwtToken(payload, secret) {
  const token = jwt.sign(payload, secret);
  return token;
}

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/register.html"));
});

router.post("/", (req, res) => {
  // const token = generateJwtToken({ user: req.body.username }, "secret");
  // res.cookie("accesstoken", token, { maxAge: 604800000, httpOnly: true });
  // res.redirect("/admin");
});

module.exports = router;

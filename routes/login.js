const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/login.html"));
});

router.post("/", urlencodedParser, (req, res) => {
  const username = req.body.username;

  if (!username) {
    return response.status(400).json({ error: "Username is required" });
  }

  const password = req.body.password;
  if (!password) {
    return response.status(400).json({ error: "Password is required" });
  }
  const token = jwt.sign("token", "secret");
  res.cookie("accesstoken", token, { maxAge: 604800000, httpOnly: true });
  res.redirect("/admin");
});

module.exports = router;

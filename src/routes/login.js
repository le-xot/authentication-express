const { Router } = require("express");
const router = Router();
const path = require("path");
const { login } = require("../services/login.service.js");
const { db } = require("../services/db.service.js");
require("dotenv").config();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/login.html"));
});

router.get("/denied", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/denied.html"));
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.send("Username is empty");
  }

  console.log(login(username, password));
});

module.exports = router;

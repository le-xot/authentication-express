const { Router } = require("express");
const router = Router();
const { join } = require("path");
const { register } = require("../services/register.service.js");

router.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../static/register.html"));
});

router.get("/warning", (req, res) => {
  res.sendFile(join(__dirname, "../static/warning.html"));
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  await register(username, password);
});

module.exports = router;

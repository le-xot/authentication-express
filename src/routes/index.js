const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db.js");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/index.html"));
});

router.post("/delete", async (req, res) => {
  await db.User.deleteMany({});
  res.sendStatus(204);
});

module.exports = router;

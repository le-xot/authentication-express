const express = require("express");
const router = express.Router();
const path = require("path");
const { db } = require("../services/db.service.js");
const user = require("../repositories/user.repository.js");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/admin.html"));
});

router.get("/api/users", async (req, res) => {
  try {
    const users = await db.User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post("/delete", async (req, res) => {
  await db.User.deleteMany({ username: { $ne: "admin" } });
  res.redirect("/admin");
});

module.exports = router;

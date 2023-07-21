const express = require("express");
const router = express.Router();
const path = require("path");
const { User } = require("../repos/user.repo");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/admin.html"));
});

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post("/delete", async (req, res) => {
  await User.deleteMany({ username: { $ne: "admin" } });
  res.redirect("/admin");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const path = require("path");
const { deleteUsers } = require("../services/deleteUsers.service.js");
const { getUsers } = require("../api/apiUsers.js");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/admin.html"));
});

router.get("/api/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

router.post("/delete", async (req, res) => {
  await deleteUsers();
  res.redirect("/admin");
});

module.exports = router;

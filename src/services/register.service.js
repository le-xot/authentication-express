const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../services/db.service.js");

async function register(username, password) {
  const user = await db.User.findOne({
    username: username,
  });
  console.log(user);
}

module.exports = { register };

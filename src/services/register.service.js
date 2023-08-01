const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../services/db.service.js");

async function register(username, password) {
<<<<<<< Updated upstream
  const user = await db.User.findOne({
    username: username,
  });
  console.log(user);
=======
  const user = await User.findOne({ username: username });

  if (user === null) {
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      password: hash,
    });

    return newUser;
  }
  return false;
>>>>>>> Stashed changes
}

module.exports = { register };

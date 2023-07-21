const { db } = require("../services/db.service.js");
require("dotenv").config();

async function login(username, password) {
  if (!username) {
    throw new Error("Username is empty");
  }

  return console.log(await db.User.findOne({ username, password }));
}

module.exports = { login };

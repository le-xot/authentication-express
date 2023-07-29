const { client } = require("../server/redis.service.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
function generationRefreshToken(newUser) {
  const secret = process.env.SECRET_TOKEN_REFRESH;
  const token = jwt.sign({ newUser }, secret);
  client.set(newUser.username, token, "EX", 7 * 24 * 60 * 60);
  return token;
}

module.exports = { generationRefreshToken };

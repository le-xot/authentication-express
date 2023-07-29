const { client } = require("./redis.service");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
// function generationRefreshToken(newUser) {
//   const secret = process.env.SECRET_TOKEN_REFRESH;

//   const refreshToken = randomBytes(32).toString('hex');

//   // const token = jwt.sign({ newUser }, secret);
//   client.set(newUser.username, refreshToken, "EX", 7 * 24 * 60 * 60);

//   return refreshToken;
// }

function generationTokens(payload) {
  // refresh -> { access, refresh }

  return { accessToken, refreshToken };
}

module.exports = { generationRefreshToken };

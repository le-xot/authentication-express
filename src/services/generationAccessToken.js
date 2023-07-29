require("dotenv").config();
const jwt = require("jsonwebtoken");

// function generationAccessToken(user) {
//   const secret = process.env.SECRET_TOKEN_ACCESS;
//   const token = jwt.sign({ user }, secret);
//   return token;
// }

module.exports = { generationAccessToken };

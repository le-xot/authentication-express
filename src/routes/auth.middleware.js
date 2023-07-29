const jwt = require("jsonwebtoken");
const { client } = require("../server/redis.service");
const { generateTokens } = require("../services/generateTokens.js");

function authMiddleware(req, res, next) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.redirect("/login");
  }

  try {
    const secret = process.env.SECRET_TOKEN_ACCESS;
    if (jwt.verify(accessToken, secret)) {
      next();
    } else {
      client.get(refreshToken, (err, reply) => {
        if (err || !reply) {
          return res.redirect("/login");
        }
        const user = JSON.parse(reply);
        const { accessToken, refreshToken } = generateTokens(user);
        res.cookie("accessToken", accessToken);
        res.cookie("refreshToken", refreshToken);
        next();
      });
    }
  } catch (error) {
    return res.redirect("/login");
  }
}

module.exports = authMiddleware;

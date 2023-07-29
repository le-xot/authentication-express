const jwt = require("jsonwebtoken");
const { client } = require("../server/redis.service");
const { generateTokens } = require("../services/generateTokens.js");

function authMiddleware(req, res, next) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  try {
    const secret = process.env.SECRET_TOKEN_ACCESS;
    if (accessToken && jwt.verify(accessToken, secret)) {
      next();
    } else if (refreshToken) {
      try {
        const reply = client.get(refreshToken);
        if (!reply) {
          return res.redirect("/login");
        }
        const user = JSON.parse(reply);
        const { newAccessToken, refreshToken } = generateTokens(user);
        res.cookie("accessToken", newAccessToken);
        res.cookie("refreshToken", refreshToken);
        next();
      } catch (err) {
        return res.redirect("/login");
      }
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    return res.redirect("/login");
  }
}

module.exports = authMiddleware;

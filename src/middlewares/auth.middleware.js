const jwt = require("jsonwebtoken");
const { client } = require("../server/redis.service");
const { generateTokens } = require("../services/generateTokens.js");
const { SECRET_TOKEN_ACCESS } = require("../services/environment.service");

function authMiddleware(req, res, next) {
  const accessToken = req.cookies.accessToken;

  try {
    const secret = process.env.SECRET_TOKEN_ACCESS;
    if (jwt.verify(accessToken, secret)) {
      return next();
    }
  } catch (error) {
  }

  return res.redirect("/login");

  // Для рефреша нужно использовать отдельный endpoint

  // const refreshToken = req.cookies.refreshToken;
  // try {
  //   const secret = process.env.SECRET_TOKEN_ACCESS;

  //   if (accessToken && jwt.verify(accessToken, secret)) {
  //     next();
  //   } else if (refreshToken) {
  //       const reply = client.get(refreshToken);

  //       if (!reply) {
  //         return res.redirect("/login");
  //       }

  //       const user = JSON.parse(reply);
  //       const { newAccessToken, newRefreshToken } = generateTokens(user);

  //       res.cookie("accessToken", newAccessToken);
  //       res.cookie("refreshToken", newRefreshToken);
  //       next();
  //   } else {
  //     return res.redirect("/login");
  //   }
  // } catch (error) {
  //   return res.redirect("/login");
  // }
}

module.exports = authMiddleware;

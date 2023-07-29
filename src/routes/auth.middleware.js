const jwt = require("jsonwebtoken");
const { client } = require("./redis.service");
const { generationAccessToken } = require("./generationAccessToken");

function authMiddleware(req, res, next) {
  const accessToken = req.cookies.accessToken; //
  const refreshToken = req.cookies.refreshToken; //

  if (!accessToken) {
    //
    return res.redirect("/login"); //
  } //

  try {
    const secret = process.env.SECRET_TOKEN_ACCESS;
    if (jwt.verify(accessToken, secret)) {
      next(); //
    } else {
      client.get(refreshToken, (err, reply) => {
        if (err || !reply) {
          //
          return res.redirect("/login"); //
        } //
        const user = JSON.parse(reply);
        const newAccessToken = generationAccessToken(user);
        res.cookie("accessToken", newAccessToken); //
        next(); //
      });
    }
  } catch (error) {
    return res.redirect("/login"); //
  }
}

module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.redirect("/login");
  }

  try {
    const secret = process.env.SECRET_TOKEN_ACCESS;
    const decoded = jwt.verify(accessToken, secret);
    next();
  } catch (error) {
    return res.redirect("/login");
  }
}

module.exports = authMiddleware;

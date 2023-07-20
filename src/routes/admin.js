const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/admin.html"));
});

module.exports = router;

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.accesstoken;
//   if (!token) {
//     return res.sendFile(path.join(__dirname, "../html/denied.html"));
//   }
//   try {
//     const decoded = jwt.verify(token, "secret");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: "Недействительный токен" });
//   }
// };

// router.get("/", verifyToken, (req, res) => {
//   res.sendFile(path.join(__dirname, "../html/admin.html"));
// });

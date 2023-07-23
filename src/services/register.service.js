const { User } = require("../repos/user.repo.js");
const bcrypt = require("bcrypt");

async function register(username, password) {
  const user = await User.findOne({ username: username });
  if (user === null) {
    bcrypt.hash(password, 10, (err, hash) => {
      User.create({ username: username, password: hash, role: "user" });
    });
    return true;
  }
}

module.exports = { register };

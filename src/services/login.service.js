const { User } = require("../repos/user.repo.js");
const bcrypt = require("bcrypt");

async function login(username, password) {
  const user = await User.findOne({ username: username });
  if (user && bcrypt.compareSync(password, user.password)) {
    return true;
  }
}

module.exports = { login };

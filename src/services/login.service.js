const { User } = require("../repos/user.repo.js");

async function login(username, password) {
  const user = await User.findOne({ username: username });
  if (user && user.password === password) {
    return true;
  }
}

module.exports = { login };

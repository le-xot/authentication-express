const { User } = require("../repos/user.repo.js");

async function register(username, password) {
  const user = await User.findOne({ username: username });
  if (user === null) {
    User.create({ username: username, password: password });
    return true;
  }
}

module.exports = { register };

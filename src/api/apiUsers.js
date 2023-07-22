const { User } = require("../repos/user.repo.js");

async function getUsers() {
  const users = await User.find({});
  return users;
}

module.exports = { getUsers };

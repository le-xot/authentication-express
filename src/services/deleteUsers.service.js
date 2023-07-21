const { User } = require("../repos/user.repo");

async function deleteUsers() {
  await User.deleteMany({ username: { $ne: "admin" } });
}

module.exports = { deleteUsers };

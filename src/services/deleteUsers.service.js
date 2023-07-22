const { User } = require("../repos/user.repo");

async function deleteUsers() {
  await User.deleteMany({ role: { $ne: "admin" } });
}

module.exports = { deleteUsers };

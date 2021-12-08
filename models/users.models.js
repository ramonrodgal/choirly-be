const User = require("../schemas/user");

exports.fetchUsers = async () => {
  return await User.find();
};

const User = require("../schemas/user");

exports.fetchUsers = async () => {
  return await User.find();
};

exports.fetchUserByUsername = async (username) => {
  const user = await User.find({ username: username });
  return user[0];
};

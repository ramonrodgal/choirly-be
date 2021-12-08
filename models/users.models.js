const User = require("../schemas/user");

exports.fetchUsers = async () => {
  return await User.find();
};

exports.fetchUserByUsername = async (username) => {
  const user = await User.find({ username: username });

  if (user.length === 0) {
    return Promise.reject({ status: 404, msg: "User not found" });
  }

  return user[0];
};

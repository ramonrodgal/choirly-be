const User = require("../schemas/user");
const { checkFieldsAndType } = require("../utils/utils");

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

exports.insertUser = async (body) => {
  const refObj = {
    email: "string",
    username: "string",
    last_name: "string",
    first_name: "string",
    phone_number: "string",
  };

  if (!checkFieldsAndType(body, refObj)) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  const user = await User.find({ username: body.username });
  if (user.length > 0) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request. Username already exists",
    });
  }

  const newUser = new User(body);
  return await newUser.save();
};

exports.removeUserByUsername = async (username) => {
  const user = await this.fetchUserByUsername(username);

  await User.deleteOne({ username: username });

  return user;
};

exports.updateUserByUsername = async (username, body) => {
  const user = await User.find({ username: username });
  const userId = user[0]._id.toString();

  if (user.length === 0) {
    return Promise.reject({ status: 404, msg: "User not found" });
  }

  await User.updateOne({ username: username }, body);
  const newUser = await User.find({ _id: userId });
  return newUser[0];
};

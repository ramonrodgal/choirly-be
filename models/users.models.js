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

exports.insertUser = async (body) => {
  const requiredFields = [
    "email",
    "username",
    "last_name",
    "first_name",
    "phone_number",
  ];
  let allFields = true;
  let allFieldTypes = true;

  const fieldTypesReference = {
    email: "string",
    username: "string",
    last_name: "string",
    first_name: "string",
    phone_number: "number",
  };

  for (let requiredField of requiredFields) {
    if (!body.hasOwnProperty(requiredField)) {
      allFields = false;
    }
    if (fieldTypesReference[requiredField] !== typeof body[requiredField]) {
      allFieldTypes = false;
    }
  }

  if (!allFields || !allFieldTypes) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  const user = new User(body);
  return await user.save();
};

exports.removeUserByUsername = async (username) => {
  const user = await this.fetchUserByUsername(username);

  await User.deleteOne({ username: username });

  return user;
};

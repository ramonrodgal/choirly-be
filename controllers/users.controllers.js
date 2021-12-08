const { fetchUsers } = require("../models/users.models");

exports.getUsers = async (req, res, next) => {
  try {
    console.log("inside controller");
    fetchUsers();
  } catch (err) {
    next(err);
  }
};

const {
  fetchUsers,
  fetchUserByUsername,
  insertUser,
} = require("../models/users.models");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await fetchUserByUsername(username);
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await insertUser(body);
    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};

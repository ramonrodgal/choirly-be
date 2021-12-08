const usersRouters = require("express").Router();
const {
  getUsers,
  getUserByUsername,
  postUser,
} = require("../controllers/users.controllers");

usersRouters.route("/").get(getUsers).post(postUser);

usersRouters.route("/:username").get(getUserByUsername);

module.exports = usersRouters;

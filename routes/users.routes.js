const usersRouters = require("express").Router();
const {
  getUsers,
  getUserByUsername,
  postUser,
  deleteUserByUsername,
} = require("../controllers/users.controllers");

usersRouters.route("/").get(getUsers).post(postUser);

usersRouters
  .route("/:username")
  .get(getUserByUsername)
  .delete(deleteUserByUsername);

module.exports = usersRouters;

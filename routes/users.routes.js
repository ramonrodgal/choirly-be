const usersRouters = require("express").Router();
const {
  getUsers,
  getUserByUsername,
  postUser,
  deleteUserByUsername,
  getNotificationsByUsername,
} = require("../controllers/users.controllers");

usersRouters.route("/").get(getUsers).post(postUser);

usersRouters
  .route("/:username")
  .get(getUserByUsername)
  .delete(deleteUserByUsername);

usersRouters.route("/:username/notifications").get(getNotificationsByUsername);

module.exports = usersRouters;

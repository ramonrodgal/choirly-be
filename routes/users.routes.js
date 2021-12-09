const usersRouters = require("express").Router();
const {
  getUsers,
  postUser,
  getUserByUsername,
  deleteUserByUsername,
  patchUserByUsername,
} = require("../controllers/users.controllers");

usersRouters.route("/").get(getUsers).post(postUser);

usersRouters
  .route("/:username")
  .get(getUserByUsername)
  .patch(patchUserByUsername)
  .delete(deleteUserByUsername);

module.exports = usersRouters;

const usersRouters = require("express").Router();
const {
  getUsers,
  postUser,
  getUserByUsername,
  deleteUserByUsername,
  patchUserByUsername,
  patchUserGroups,
} = require("../controllers/users.controllers");

usersRouters.route("/").get(getUsers).post(postUser);

usersRouters
  .route("/:username")
  .get(getUserByUsername)
  .patch(patchUserByUsername)
  .delete(deleteUserByUsername);

usersRouters.route("/:username/choirs").patch(patchUserGroups);

module.exports = usersRouters;

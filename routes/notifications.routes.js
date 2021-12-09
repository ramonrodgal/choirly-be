const notificationsRouters = require("express").Router();
const {
  getNotificationsByUsername,
  postNotificationByUsername,
} = require("../controllers/notifications.controllers");

notificationsRouters
  .route("/:username")
  .get(getNotificationsByUsername)
  .post(postNotificationByUsername);

module.exports = notificationsRouters;

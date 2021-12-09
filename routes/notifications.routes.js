const notificationsRouters = require("express").Router();
const {
  getNotificationsByUsername,
  postNotificationByUsername,
  patchNotificationById,
} = require("../controllers/notifications.controllers");

notificationsRouters.route("/:notification_id").patch(patchNotificationById);

notificationsRouters
  .route("/user/:username")
  .get(getNotificationsByUsername)
  .post(postNotificationByUsername);

module.exports = notificationsRouters;

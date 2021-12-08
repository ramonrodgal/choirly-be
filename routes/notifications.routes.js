const notificationsRouters = require("express").Router();
const {
  getNotificationsByUsername,
} = require("../controllers/notifications.controllers");

notificationsRouters.route("/:username").get(getNotificationsByUsername);

module.exports = notificationsRouters;

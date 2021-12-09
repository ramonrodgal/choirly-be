const {
  fetchNotificationsByUsername,
  insertNotificationByUsername,
} = require("../models/notifications.models");

exports.getNotificationsByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const notifications = await fetchNotificationsByUsername(username);
    res.status(200).send({ notifications });
  } catch (err) {
    next(err);
  }
};

exports.postNotificationByUsername = async (req, res, next) => {
  const { username } = req.params;
  const { body } = req;

  try {
    const notification = await insertNotificationByUsername(username, body);
    res.status(201).send({ notification });
  } catch (err) {
    next(err);
  }
};

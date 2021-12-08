const {
  fetchNotificationsByUsername,
} = require("../models/notifications.models");

exports.getNotificationsByUsername = async (req, res, next) => {
  const { username } = req.params;
  console.log("inside controller");
  try {
    const notifications = await fetchNotificationsByUsername(username);
    res.status(200).send({ notifications });
  } catch (err) {
    next(err);
  }
};

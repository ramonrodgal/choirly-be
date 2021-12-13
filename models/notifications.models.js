const { fetchUserByUsername } = require("./users.models");
const Notification = require("../schemas/notification");
const ObjectId = require("mongoose").Types.ObjectId;
const { checkFieldsAndType } = require("../utils/utils");

exports.fetchNotificationsByUsername = async (username) => {
  await fetchUserByUsername(username);

  const notifications = await Notification.find({ username: username });

  return notifications;
};

exports.insertNotificationByUsername = async (username, body) => {
  const refObj = {
    username: "string",
    type: "string",
    choir: "string",
    author: "string",
  };

  if (!checkFieldsAndType(body, refObj)) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  await fetchUserByUsername(username);
  const notification = new Notification(body);
  return await notification.save();
};

exports.updateNotificationById = async (notification_id, body) => {
  if (!ObjectId.isValid(notification_id)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request. Invalid notification id",
    });
  }

  const notification = await Notification.find({ _id: notification_id });

  if (notification.length === 0) {
    return Promise.reject({ status: 404, msg: "Notification not found" });
  }

  await Notification.updateOne({ _id: notification_id }, body);
  const newNotification = await Notification.find({ _id: notification_id });
  return newNotification[0];
};

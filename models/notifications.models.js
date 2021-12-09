const { fetchUserByUsername } = require("./users.models");
const Notification = require("../schemas/notification");
const ObjectId = require("mongoose").Types.ObjectId;

exports.fetchNotificationsByUsername = async (username) => {
  await fetchUserByUsername(username);

  const notifications = await Notification.find({ username: username });

  return notifications;
};

exports.insertNotificationByUsername = async (username, body) => {
  const requiredFields = ["username", "type", "choir", "author"];
  let allFields = true;
  let allFieldTypes = true;

  const fieldTypesReference = {
    username: "string",
    type: "string",
    choir: "string",
    author: "string",
  };

  for (let requiredField of requiredFields) {
    if (!body.hasOwnProperty(requiredField)) {
      allFields = false;
    }
    if (fieldTypesReference[requiredField] !== typeof body[requiredField]) {
      allFieldTypes = false;
    }
  }

  if (!allFields || !allFieldTypes) {
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
    Promise.reject({ status: 404, msg: "Notification not Found" });
  }

  const requiredFields = ["accepted", "read"];
  let allFields = true;
  let allFieldTypes = true;

  const fieldTypesReference = {
    accepted: "boolean",
    read: "boolean",
  };

  for (const property in body) {
    if (!requiredFields.includes(property)) {
      allFields = false;
    }
    if (fieldTypesReference[property] !== typeof body[property]) {
      allFieldTypes = false;
    }
  }

  if (!allFields || !allFieldTypes) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  await Notification.updateOne({ _id: notification_id }, body);
  const newNotification = await Notification.find({ _id: notification_id });
  return newNotification[0];
};

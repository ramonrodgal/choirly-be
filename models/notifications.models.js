const { fetchUserByUsername } = require("./users.models");
const Notification = require("../schemas/notification");

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

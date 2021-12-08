const { fetchUserByUsername } = require("./users.models");
const Notification = require("../schemas/notification");

exports.fetchNotificationsByUsername = async (username) => {
  console.log("inside model");
  await fetchUserByUsername(username);

  const notifications = await Notification.find({ username: username });

  return notifications;
};

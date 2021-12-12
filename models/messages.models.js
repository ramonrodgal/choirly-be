const GroupMessage = require("../schemas/groupMessage");
const { fetchChoirById } = require("./choirs.models");
const { fetchUserByUsername } = require("./users.models");
const ObjectId = require("mongoose").Types.ObjectId;
const { checkFieldsAndType } = require("../utils/utils");

exports.fetchMessagesByChoirId = async (choir_id) => {
  const choir = await fetchChoirById(choir_id);

  return await GroupMessage.find({ choir: choir.name });
};

exports.insertMessage = async (body) => {
  const refObj = {
    choir: "string",
    author: "string",
    title: "string",
    body: "string",
  };

  if (!checkFieldsAndType(body, refObj)) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  const message = new GroupMessage(body);
  return await message.save();
};

exports.deleteMessageById = async (message_id) => {
  const message = await this.fetchMessageById(message_id);
  await GroupMessage.deleteOne({ _id: message_id });

  return message;
};

exports.fetchMessageById = async (message_id) => {
  if (!ObjectId.isValid(message_id)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request. Invalid message id",
    });
  }

  const message = await GroupMessage.find({ _id: message_id });

  if (message.length === 0) {
    return Promise.reject({ status: 404, msg: "Message not found" });
  }

  return message[0];
};

exports.updateMessageById = async (message_id, body) => {
  await this.fetchMessageById(message_id);

  await GroupMessage.updateOne({ _id: notification_id }, { likes: body.likes });
  const newNotification = await GroupMessage.find({ _id: notification_id });
  return newNotification[0];
};

exports.insertComment = async (message_id, body) => {
  const refObj = {
    author: "string",
    body: "string",
  };

  if (!checkFieldsAndType(body, refObj)) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  await fetchUserByUsername(body.author);

  const message = await this.fetchMessageById(message_id);

  message.comments.push(body);
  message.save();

  return message;
};

exports.updateLikes = async (message_id, body) => {
  const refObj = {
    username: "string",
  };

  if (!checkFieldsAndType(body, refObj)) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  await fetchUserByUsername(body.username);

  const message = await this.fetchMessageById(message_id);

  if (message.likedBy.includes(body.username)) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request. The user already liked this message",
    });
  }

  message.likes++;
  message.likedBy.push(body.username);
  message.save();

  return message;
};

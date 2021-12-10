const GroupMessage = require("../schemas/groupMessage");
const { fetchChoirById } = require("./choirs.models");
const { fetchUserByUsername } = require("./users.models");
const ObjectId = require("mongoose").Types.ObjectId;

exports.fetchMessagesByChoirId = async (choir_id) => {
  const choir = await fetchChoirById(choir_id);

  return await GroupMessage.find({ choir: choir.name });
};

exports.insertMessage = async (body) => {
  const requiredFields = ["choir", "author", "title", "body"];
  let allFields = true;
  let allFieldTypes = true;

  const fieldTypesReference = {
    choir: "string",
    author: "string",
    title: "string",
    body: "string",
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

  const message = new GroupMessage(body);
  return await message.save();
};

exports.deleteMessageById = async (message_id) => {
  await this.fetchMessageById(message_id);
  await GroupMessage.deleteOne({ _id: message_id });
  return message[0];
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

  console.log(message_id, "message_id");
  console.log(body, "body");

  await GroupMessage.updateOne({ _id: notification_id }, { likes: body.likes });
  const newNotification = await GroupMessage.find({ _id: notification_id });
  return newNotification[0];
};

exports.insertComment = async (message_id, body) => {
  const requiredFields = ["author", "body"];
  let allFields = true;
  let allFieldTypes = true;

  const fieldTypesReference = {
    author: "string",
    body: "string",
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

  await fetchUserByUsername(body.author);

  const message = await this.fetchMessageById(message_id);

  message.comments.push(body);
  message.save();

  return message;
};

const messageRouters = require("express").Router();
const {
  getMessagesByChoirId,
  postMessage,
} = require("../controllers/messages.controllers");

messageRouters.route("/choirs/:choir_id").get(getMessagesByChoirId);
messageRouters.route("/").post(postMessage);

module.exports = messageRouters;

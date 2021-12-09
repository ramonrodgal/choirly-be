const messageRouters = require("express").Router();
const {
  getMessagesByChoirId,
  postMessageByChoirId,
} = require("../controllers/messages.controllers");

messageRouters.route("/choirs/:choir_id").get(getMessagesByChoirId);
messageRouters.route("/").post(postMessageByChoirId);

module.exports = messageRouters;

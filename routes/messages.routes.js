const messageRouters = require("express").Router();
const {
  getMessagesByChoirId,
  postMessage,
  getMessageById,
  deleteMessageById,
} = require("../controllers/messages.controllers");

messageRouters.route("/choirs/:choir_id").get(getMessagesByChoirId);
messageRouters
  .route("/:message_id")
  .get(getMessageById)
  .delete(deleteMessageById);
messageRouters.route("/").post(postMessage);

module.exports = messageRouters;

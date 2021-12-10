const messageRouters = require("express").Router();
const {
  getMessagesByChoirId,
  postMessage,
  getMessageById,
  deleteMessageById,
  patchMessageById,
  postComment,
} = require("../controllers/messages.controllers");

messageRouters.route("/choir/:choir_id").get(getMessagesByChoirId);
messageRouters
  .route("/:message_id")
  .get(getMessageById)
  .patch(patchMessageById)
  .delete(deleteMessageById);

messageRouters.route("/:message_id/comments").post(postComment);
messageRouters.route("/").post(postMessage);

module.exports = messageRouters;

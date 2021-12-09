const messageRouters = require("express").Router();
const { getMessagesByChoirId } = require("../controllers/messages.controllers");

messageRouters.route("/choir/:choir_id").get(getMessagesByChoirId);

module.exports = messageRouters;

const messageRouters = require("express").Router();
const { getMessagesByChoirId } = require("../controllers/messages.controllers");

messageRouters.route("/choirs/:choir_id").get(getMessagesByChoirId);

module.exports = messageRouters;

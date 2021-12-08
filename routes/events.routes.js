const eventsRouters = require("express").Router();
const { getEvents } = require("../controllers/events.controllers");

eventsRouters.route("/").get(getEvents);

module.exports = eventsRouters;

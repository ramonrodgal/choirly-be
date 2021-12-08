const eventsRouters = require("express").Router();
const {
  getEvents,
  getEventsById,
} = require("../controllers/events.controllers");

eventsRouters.route("/").get(getEvents);
eventsRouters.route("/:event_id").get(getEventsById);

module.exports = eventsRouters;

const eventsRouters = require("express").Router();
const {
  getEvents,
  getEventsById,
  getEventsByChoirId,
} = require("../controllers/events.controllers");

eventsRouters.route("/").get(getEvents);
eventsRouters.route("/:event_id").get(getEventsById);
eventsRouters.route("/choir/:choir_id").get(getEventsByChoirId);

module.exports = eventsRouters;

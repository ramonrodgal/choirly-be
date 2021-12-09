const eventsRouters = require("express").Router();
const {
  getEvents,
  getEventsById,
  getEventsByChoirId,
  postEventByChoirId,
} = require("../controllers/events.controllers");

eventsRouters.route("/").get(getEvents);
eventsRouters.route("/:event_id").get(getEventsById);
eventsRouters
  .route("/choir/:choir_id")
  .get(getEventsByChoirId)
  .post(postEventByChoirId);

module.exports = eventsRouters;

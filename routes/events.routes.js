const eventsRouters = require("express").Router();
const {
  getEvents,
  getEventsById,
  getEventsByChoirId,
  postEventByChoirId,
  patchEventUsers,
} = require("../controllers/events.controllers");

eventsRouters.route("/").get(getEvents);
eventsRouters.route("/:event_id").get(getEventsById);
eventsRouters.route("/:event_id/users/").patch(patchEventUsers);
eventsRouters
  .route("/choir/:choir_id")
  .get(getEventsByChoirId)
  .post(postEventByChoirId);

module.exports = eventsRouters;

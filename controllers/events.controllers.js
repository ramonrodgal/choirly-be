const { fetchEvents, fetchEventsById } = require("../models/events.models");

exports.getEvents = async (req, res, next) => {
  try {
    const events = await fetchEvents();
    res.status(200).send({ events });
  } catch (err) {
    next(err);
  }
};

exports.getEventsById = async (req, res, next) => {
  const { event_id } = req.params;
  try {
    const events = await fetchEventsById(event_id);
    res.status(200).send({ events });
  } catch (err) {
    next(err);
  }
};

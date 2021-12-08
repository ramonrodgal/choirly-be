const { fetchEvents } = require("../models/events.models");

exports.getEvents = async (req, res, next) => {
  try {
    const events = await fetchEvents();
    res.status(200).send({ events });
  } catch (err) {
    next(err);
  }
};

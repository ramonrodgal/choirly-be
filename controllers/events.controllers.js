const {
  fetchEvents,
  fetchEventsById,
  fetchEventsByChoirId,
  insertEventByChoirId,
  updateEventUsers,
} = require("../models/events.models");

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

exports.getEventsByChoirId = async (req, res, next) => {
  const { choir_id } = req.params;
  try {
    const events = await fetchEventsByChoirId(choir_id);
    res.status(200).send({ events });
  } catch (err) {
    next(err);
  }
};

exports.postEventByChoirId = async (req, res, next) => {
  const { choir_id } = req.params;
  const { body } = req;
  try {
    const event = await insertEventByChoirId(choir_id, body);
    res.status(201).send({ event });
  } catch (err) {
    next(err);
  }
};

exports.patchEventUsers = async (req, res, next) => {
  const { event_id } = req.params;
  const { body } = req;

  try {
    const event = await updateEventUsers(event_id, body);
    res.status(200).send({ event });
  } catch (err) {
    next(err);
  }
};

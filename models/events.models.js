const Event = require("../schemas/event");
const ObjectId = require("mongoose").Types.ObjectId;
const { fetchChoirById } = require("../models/choirs.models");

exports.fetchEvents = async () => {
  return await Event.find();
};

exports.fetchEventsById = async (event_id) => {
  if (!ObjectId.isValid(event_id)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request. Invalid event id",
    });
  }

  const events = await Event.find({ _id: event_id });

  if (events.length === 0) {
    return Promise.reject({ status: 404, msg: "Events not found" });
  }

  return events;
};

exports.fetchEventsByChoirId = async (choir_id) => {
  const choir = await fetchChoirById(choir_id);
  const events = await Event.find({ choir: choir.name });

  if (events.length === 0) {
    return Promise.reject({ status: 400, msg: "Events not found" });
  }

  return events;
};

exports.insertEventByChoirId = async (choir_id, body) => {
  await fetchChoirById(choir_id);

  const event = new Event(body);
  return await event.save();
};

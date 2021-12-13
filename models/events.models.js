const Event = require("../schemas/event");
const ObjectId = require("mongoose").Types.ObjectId;
const { fetchChoirById } = require("../models/choirs.models");
const { fetchUserByUsername } = require("../models/users.models");
const { checkFieldsAndType } = require("../utils/utils");

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
    return Promise.reject({ status: 404, msg: "Event not found" });
  }

  return events[0];
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

  const refObj = {
    title: "string",
    choir: "string",
    type: "string",
    location: "string",
    duration: "string",
    details: "string",
  };

  if (!checkFieldsAndType(body, refObj)) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  if (body.type !== "rehersal" && body.type !== "concert") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request. Invalid event type",
    });
  }

  const event = new Event(body);
  return await event.save();
};

exports.updateEventUsers = async (event_id, body) => {
  const refObj = {
    username: "string",
    going: "boolean",
  };

  if (!checkFieldsAndType(body, refObj)) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  await fetchUserByUsername(body.username);

  const event = await this.fetchEventsById(event_id);

  if (body.going) {
    if (event.going.includes(body.username)) {
      return Promise.reject({
        status: 400,
        msg: "Bad request. The user is already going to this event",
      });
    }
    if (event.not_going.includes(body.username)) {
      event.not_going.splice(event.not_going.indexOf(body.username), 1);
    }
    event.going.push(body.username);
  } else {
    if (event.not_going.includes(body.username)) {
      return Promise.reject({
        status: 400,
        msg: "Bad request. The user is already not going to this event",
      });
    }
    if (event.going.includes(body.username)) {
      event.going.splice(event.going.indexOf(body.username), 1);
    }
    event.not_going.push(body.username);
  }

  await event.save();
  return event;
};

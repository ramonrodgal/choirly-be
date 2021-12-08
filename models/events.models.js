const Event = require("../schemas/event");

exports.fetchEvents = async () => {
  return await Event.find();
};

exports.fetchEventsById = async (event_id) => {
  console.log("inside model");
  return await Event.find({ _id: event_id });
};

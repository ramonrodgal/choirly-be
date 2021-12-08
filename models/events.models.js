const Event = require("../schemas/event");

exports.fetchEvents = async () => {
  return await Event.find();
};

const Choir = require("../schemas/choir");

exports.fetchChoirs = async (location) => {
  if (location) {
    return await Choir.find({ location: location });
  }
  return await Choir.find();
};

exports.fetchChoirById = async (choir_id) => {
  const choir = await Choir.find({ _id: choir_id });
  if (choir.length === 0) {
    return Promise.reject({ status: 404, msg: "Choir not found" });
  }
  return choir[0];
};

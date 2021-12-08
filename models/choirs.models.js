const Choir = require("../schemas/choir");

exports.fetchChoirs = async (location) => {
  if (location) {
    const choirs = await Choir.find({ location: location });
    if (choirs.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "Choirs not found, invalid location",
      });
    }
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

exports.insertChoir = async (body) => {
  const requiredFields = ["name", "location", "description", "leader"];
  let allFields = true;
  let allFieldTypes = true;

  const fieldTypesReference = {
    name: "string",
    location: "string",
    description: "string",
    leader: "string",
  };

  for (let requiredField of requiredFields) {
    if (!body.hasOwnProperty(requiredField)) {
      allFields = false;
    }
    if (fieldTypesReference[requiredField] !== typeof body[requiredField]) {
      allFieldTypes = false;
    }
  }

  if (!allFields || !allFieldTypes) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  const choir = new Choir(body);
  return await choir.save();
};

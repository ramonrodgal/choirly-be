const GroupMessage = require("../schemas/groupMessage");
const { fetchChoirById } = require("./choirs.models");

exports.fetchMessagesByChoirId = async (choir_id) => {
  const choir = await fetchChoirById(choir_id);

  return await GroupMessage.find({ choir: choir.name });
};

exports.insertMessage = async (body) => {
  const requiredFields = ["choir", "author", "title", "body"];
  let allFields = true;
  let allFieldTypes = true;

  const fieldTypesReference = {
    choir: "string",
    author: "string",
    title: "string",
    body: "string",
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

  const message = new GroupMessage(body);
  return await message.save();
};

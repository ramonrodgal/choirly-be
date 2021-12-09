const GroupMessage = require("../schemas/groupMessage");
const { fetchChoirById } = require("./choirs.models");

exports.fetchMessagesByChoirId = async (choir_id) => {
  const choir = await fetchChoirById(choir_id);

  return await GroupMessage.find({ choir: choir.name });
};

exports.insertMessageByChoirId = async (body) => {
  const message = new GroupMessage(body);
  return await message.save();
};

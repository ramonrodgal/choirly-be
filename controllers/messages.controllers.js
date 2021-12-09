const { fetchMessagesByChoirId } = require("../models/messages.models");

exports.getMessagesByChoirId = async (req, res, next) => {
  const { choir_id } = req.params;
  try {
    const messages = await fetchMessagesByChoirId(choir_id);
    console.log(messages);
    res.status(200).send({ messages });
  } catch (err) {
    next(err);
  }
};

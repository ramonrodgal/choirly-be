const {
  fetchMessagesByChoirId,
  insertMessage,
} = require("../models/messages.models");

exports.getMessagesByChoirId = async (req, res, next) => {
  const { choir_id } = req.params;
  try {
    const messages = await fetchMessagesByChoirId(choir_id);
    res.status(200).send({ messages });
  } catch (err) {
    next(err);
  }
};

exports.postMessage = async (req, res, next) => {
  const { body } = req;
  try {
    const message = await insertMessage(body);
    res.status(201).send({ message });
  } catch (err) {
    next(err);
  }
};

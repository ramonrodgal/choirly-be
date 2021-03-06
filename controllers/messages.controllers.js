const {
  fetchMessagesByChoirId,
  insertMessage,
  deleteMessageById,
  fetchMessageById,
  updateMessageById,
  insertComment,
  updateLikes,
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

exports.deleteMessageById = async (req, res, next) => {
  const { message_id } = req.params;
  try {
    const message = await deleteMessageById(message_id);
    res.status(200).send({ msg: "Message deleted", message: message });
  } catch (err) {
    next(err);
  }
};

exports.getMessageById = async (req, res, next) => {
  const { message_id } = req.params;
  try {
    const message = await fetchMessageById(message_id);
    res.status(200).send({ message });
  } catch (err) {
    next(err);
  }
};

exports.patchMessageById = async (req, res, next) => {
  const { message_id } = req.params;
  const { body } = req;

  try {
    const message = await updateMessageById(message_id, body);
  } catch (err) {
    next(err);
  }
};

exports.postComment = async (req, res, next) => {
  const { message_id } = req.params;
  const { body } = req;

  try {
    const message = await insertComment(message_id, body);
    res.status(200).send({ message });
  } catch (err) {
    next(err);
  }
};

exports.patchLikes = async (req, res, next) => {
  const { message_id } = req.params;
  const { body } = req;

  try {
    const message = await updateLikes(message_id, body);
    res.status(200).send({ message });
  } catch (err) {
    next(err);
  }
};

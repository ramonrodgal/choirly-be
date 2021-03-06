const {
  fetchChoirs,
  fetchChoirById,
  insertChoir,
  removeChoirById,
  insertFile,
  removeFileById,
  deleteMemberByUsername,
  updateMembersByUsername,
} = require("../models/choirs.models");

exports.getChoirs = async (req, res, next) => {
  const { location } = req.query;

  try {
    const choirs = await fetchChoirs(location);
    res.status(200).send({ choirs });
  } catch (err) {
    next(err);
  }
};

exports.getChoirById = async (req, res, next) => {
  const { choir_id } = req.params;
  try {
    const choir = await fetchChoirById(choir_id);
    res.status(200).send({ choir });
  } catch (err) {
    next(err);
  }
};

exports.postChoir = async (req, res, next) => {
  const { body } = req;

  try {
    const choir = await insertChoir(body);
    res.status(200).send({ choir });
  } catch (err) {
    next(err);
  }
};

exports.deleteChoirById = async (req, res, next) => {
  const { choir_id } = req.params;
  try {
    const choir = await removeChoirById(choir_id);
    res.status(200).send({ msg: "Choir removed", choir: choir });
  } catch (err) {
    next(err);
  }
};

exports.postFile = async (req, res, next) => {
  const { choir_id } = req.params;
  const { body } = req;

  try {
    const choir = await insertFile(choir_id, body);
    res.status(200).send({ choir });
  } catch (err) {
    next(err);
  }
};

exports.deleteFileById = async (req, res, next) => {
  const { file_id } = req.params;
  const { choir_id } = req.params;

  try {
    const choir = await removeFileById(file_id, choir_id);
    res.status(200).send({ choir });
  } catch (err) {
    next(err);
  }
};

exports.deleteMemberByUsername = async (req, res, next) => {
  const { choir_id, username } = req.params;

  try {
    const choir = await deleteMemberByUsername(choir_id, username);
    res.status(200).send({ choir });
  } catch (err) {
    next(err);
  }
};

exports.patchMembersByUsername = async (req, res, next) => {
  const { choir_id, username } = req.params;

  try {
    const choir = await updateMembersByUsername(choir_id, username);
    res.status(200).send({ choir });
  } catch (err) {
    next(err);
  }
};

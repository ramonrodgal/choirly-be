const {
  fetchChoirs,
  fetchChoirById,
  insertChoir,
  removeChoirById,
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
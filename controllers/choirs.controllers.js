const { fetchChoirs, fetchChoirById } = require("../models/choirs.models");

exports.getChoirs = async (req, res, next) => {
  try {
    const choirs = await fetchChoirs();
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

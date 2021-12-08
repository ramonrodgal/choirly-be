const choirsRouters = require("express").Router();
const {
  getChoirs,
  getChoirById,
} = require("../controllers/choirs.controllers");

choirsRouters.route("/").get(getChoirs);
choirsRouters.route("/:choir_id").get(getChoirById);

module.exports = choirsRouters;

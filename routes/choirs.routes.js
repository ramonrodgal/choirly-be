const choirsRouters = require("express").Router();
const {
  getChoirs,
  getChoirById,
  postChoir,
} = require("../controllers/choirs.controllers");

choirsRouters.route("/").get(getChoirs).post(postChoir);
choirsRouters.route("/:choir_id").get(getChoirById);

module.exports = choirsRouters;

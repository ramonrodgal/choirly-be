const choirsRouters = require("express").Router();
const {
  getChoirs,
  getChoirById,
  postChoir,
  deleteChoirById,
} = require("../controllers/choirs.controllers");

choirsRouters.route("/").get(getChoirs).post(postChoir);
choirsRouters.route("/:choir_id").get(getChoirById).delete(deleteChoirById);

module.exports = choirsRouters;

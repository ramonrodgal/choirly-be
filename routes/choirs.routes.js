const choirsRouters = require("express").Router();
const {
  getChoirs,
  getChoirById,
  postChoir,
  deleteChoirById,
  patchChoirMember,
  postFile,
} = require("../controllers/choirs.controllers");

choirsRouters.route("/").get(getChoirs).post(postChoir);
choirsRouters.route("/:choir_id").get(getChoirById).delete(deleteChoirById);
choirsRouters.route("/:choir_id/users").patch(patchChoirMember);
choirsRouters.route("/:choir_id/files").post(postFile);

module.exports = choirsRouters;

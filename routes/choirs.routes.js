const choirsRouters = require("express").Router();
const {
  getChoirs,
  getChoirById,
  postChoir,
  deleteChoirById,
  patchChoirMember,
  postFile,
  deleteFileById,
  deleteMemberByUsername,
  patchMembersByUsername,
} = require("../controllers/choirs.controllers");

choirsRouters.route("/").get(getChoirs).post(postChoir);
choirsRouters.route("/:choir_id").get(getChoirById).delete(deleteChoirById);
choirsRouters.route("/:choir_id/users").patch(patchChoirMember);
choirsRouters
  .route("/:choir_id/users/:username")
  .delete(deleteMemberByUsername)
  .patch(patchMembersByUsername);
choirsRouters.route("/:choir_id/files").post(postFile);
choirsRouters.route("/:choir_id/files/:file_id").delete(deleteFileById);

module.exports = choirsRouters;

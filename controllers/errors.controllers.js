exports.handleCustomErrors = (err, req, res, next) => {
  res.status(err.status || 404).send({ msg: err.msg || "not found" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  res.status(err.status || 404).send({ msg: err.msg || "not found" });
};

exports.handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

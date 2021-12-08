const apiRouter = require("express").Router();

apiRouter.route("/").get((req, res) => {
  res.status(200).send("Hello World");
});

module.exports = apiRouter;

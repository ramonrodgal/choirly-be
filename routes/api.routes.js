const apiRouter = require("express").Router();
const usersRouters = require("./users.routes");

apiRouter.use("/users", usersRouters);

apiRouter.route("/").get((req, res) => {
  res.status(200).send("Hello World");
});

module.exports = apiRouter;

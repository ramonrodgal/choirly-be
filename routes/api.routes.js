const apiRouter = require("express").Router();
const usersRouters = require("./users.routes");
const choirsRouters = require("./choirs.routes");

apiRouter.use("/users", usersRouters);
apiRouter.use("/choirs", choirsRouters);

apiRouter.route("/").get((req, res) => {
  res.status(200).send("Hello World");
});

module.exports = apiRouter;

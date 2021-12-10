const apiRouter = require("express").Router();

const usersRouters = require("./users.routes");
const choirsRouters = require("./choirs.routes");
const notificationsRouters = require("./notifications.routes");
const eventsRouters = require("./events.routes");
const messagesRouters = require("./messages.routes");

const { getEndpoints } = require("../controllers/api.controllers");

apiRouter.use("/users", usersRouters);
apiRouter.use("/choirs", choirsRouters);
apiRouter.use("/notifications", notificationsRouters);
apiRouter.use("/events", eventsRouters);
apiRouter.use("/messages", messagesRouters);

apiRouter.route("/").get(getEndpoints);

module.exports = apiRouter;

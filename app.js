const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRouter = require("./routes/api.routes");
const {
  handleCustomErrors,
  handle500Errors,
} = require("./controllers/errors.controllers");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;

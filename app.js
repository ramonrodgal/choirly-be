const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRouter = require("./routes/api.routes");
const { handleCustomErrors } = require("./controllers/errors.controllers");

const app = express();
app.use(express.json());

///THIS IS A COMMENT

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

module.exports = app;

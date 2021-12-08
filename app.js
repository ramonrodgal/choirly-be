const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRouter = require("./routes/api.routes");

const app = express();
app.use(express.json());

const port = 9000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});

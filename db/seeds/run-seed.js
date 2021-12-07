const mongoose = require("mongoose");
const User = require("../../schemas/users");
const Choir = require("../../schemas/choir");
const Event = require("../../schemas/event");
require("dotenv").config();

const { seedUser } = require("../data/development-data/users");
const { seedEvent } = require("../data/development-data/events");
const { seedChoir } = require("../data/development-data/choir");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUser);

  await Choir.deleteMany({});
  await Choir.insertMany(seedChoir);

  await Event.deleteMany({});
  await Event.insertMany(seedEvent);
};

seedDB().then(() => {
  mongoose.connection.close();
});

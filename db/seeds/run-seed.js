const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../../schemas/user");
const Choir = require("../../schemas/choir");
const Event = require("../../schemas/event");
const Notification = require("../../schemas/notification");

const { seedUser } = require("../data/development-data/user");
const { seedEvent } = require("../data/development-data/events");
const { seedChoir } = require("../data/development-data/choir");
const { seedNotification } = require("../data/development-data/notification");

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

  await Notification.deleteMany({});
  await Notification.insertMany(seedNotification);
};

seedDB().then(() => {
  mongoose.connection.close();
});

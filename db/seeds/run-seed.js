const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../../schemas/user");
const Choir = require("../../schemas/choir");
const Event = require("../../schemas/event");
const Notification = require("../../schemas/notification");
const GroupMessage = require("../../schemas/groupMessage");

const { seedUser } = require("../data/users");
const { seedEvent } = require("../data/events");
const { seedChoir } = require("../data/choirs");
const { seedNotification } = require("../data/notifications");
const { seedGroupMessage } = require("../data/groupMessages");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(seedUser);

    await Choir.deleteMany({});
    await Choir.insertMany(seedChoir);

    await Event.deleteMany({});
    await Event.insertMany(seedEvent);

    await Notification.deleteMany({});
    await Notification.insertMany(seedNotification);

    await GroupMessage.deleteMany({});
    await GroupMessage.insertMany(seedGroupMessage);
  } catch (err) {
    console.log(err);
  }
};

seedDB()
  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("connection closed");
  });

module.exports = seedDB;

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

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("connected to db");

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

    await mongoose.connection.close();
    console.log("connection closed");
  } catch (err) {
    console.log(err);
  }
};

seedDB();

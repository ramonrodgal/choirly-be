const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  choir: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  accepted: {
    type: Boolean,
  },
  read: {
    type: Boolean,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

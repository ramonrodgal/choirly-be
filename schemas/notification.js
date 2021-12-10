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
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

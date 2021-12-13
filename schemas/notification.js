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
  choir_id: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  rejected: {
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

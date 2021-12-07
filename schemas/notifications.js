const moongoose = require("mongoose");
const { Schema } = moongoose;

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
  message: {
    type: String,
    required: true,
  },
  choir: {
    type: mongoose.ObjectId,
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
  requests: [
    {
      choir: {
        type: mongoose.objectId,
        required: true,
      },
      user: {
        type: mongoose.objectId,
        required: true,
      },
      message: {
        type: String,
      },
      date: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

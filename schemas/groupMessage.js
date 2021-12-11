const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupMessageSchema = new Schema({
  choir: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [
    {
      type: String,
    },
  ],
  comments: [
    {
      author: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      body: {
        type: String,
        required: true,
      },
    },
  ],
});

const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);
module.exports = GroupMessage;

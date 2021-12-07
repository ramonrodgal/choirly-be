const moongoose = require("mongoose");
const { Schema } = moongoose;

const groupMessageSchema = new Schema({
  choir: {
    type: mongoose.objectId,
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
    required: true,
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
  comments: [
    {
      _id: {
        type: mongoose.ObjectId,
        required: true,
      },
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

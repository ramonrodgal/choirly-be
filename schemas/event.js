const moongoose = require("mongoose");
const { Schema } = moongoose;

const eventSchema = new Schema({
  title: {
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
  },
  location: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  comments: [
    {
      comment_id: {
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
  going: [
    {
      type: String,
    },
  ],
  not_going: [
    {
      type: String,
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

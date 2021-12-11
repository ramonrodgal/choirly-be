const mongoose = require("mongoose");
const { Schema } = mongoose;

const choirSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
  },
  social: {
    website: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  leader: {
    type: String,
  },
  members: [
    {
      type: String,
    },
  ],
  files: [
    {
      filename: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
  ],
});

const Choir = mongoose.model("Choir", choirSchema);

module.exports = Choir;

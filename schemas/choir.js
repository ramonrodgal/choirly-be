const moongoose = require('mongoose');
const { Schema } = moongoose;

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
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
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
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

module.exports = choirSchema;

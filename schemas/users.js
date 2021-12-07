const moongoose = require("mongoose");
const { Schema } = moongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar_url: {
    type: String,
  },
  about_me: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  social: [
    {
      youtube: {
        type: String,
      },
    },
    {
      facebook: {
        type: String,
      },
    },
    {
      instagram: {
        type: String,
      },
    },
  ],
  voice: [
    {
      type: String,
    },
  ],
  Groups: [
    {
      type: String,
    },
  ],
});
const Users = mongoose.model("User", userSchema);
module.exports = Users;

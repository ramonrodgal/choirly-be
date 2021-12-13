const mongoose = require("mongoose");

exports.seedNotification = [
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a15e"),
    username: "josephCode",
    type: "accept",
    choir: "African Children's Choir",
    choir_id: "61b0c4c065064fdfb889a148",
    author: "cakevealbladerunner",
    accepted: true,
    read: false,
  },
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a15f"),
    username: "josephCode",
    type: "message",
    choir: "Chester Bach Singers",
    choir_id: "61b0c4c065064fdfb889a150",
    author: "genie",
    read: true,
  },
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a160"),
    username: "cakevealbladerunner",
    type: "join",
    choir: "Liverpool 64",
    choir_id: "61b0c4c065064fdfb889a14c",
    author: "korus76",
    read: false,
    accepted: false,
  },
];

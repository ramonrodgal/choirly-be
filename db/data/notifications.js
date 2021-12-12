const mongoose = require("mongoose");

exports.seedNotification = [
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a15e"),
    username: "josephCode",
    type: "accept",
    choir: "African Children's Choir",
    author: "cakevealbladerunner",
    accepted: true,
    read: false,
  },
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a15f"),
    username: "josephCode",
    type: "message",
    choir: "Chester Bach Singers",
    author: "genie",
    read: true,
  },
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a160"),
    username: "cakevealbladerunner",
    type: "join",
    choir: "Liverpool 64",
    author: "korus76",
    read: false,
    accepted: false,
  },
];

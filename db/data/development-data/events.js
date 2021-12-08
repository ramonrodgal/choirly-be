const mongoose = require("mongoose");

exports.seedEvent = [
  {
    title: "African Childrens Choir in Concert",
    type: "Concert", //types are concert, and rehersal
    date: Date.now(),
    location: "Manchester",
    duration: 1,
    details: "A wonderful rendition of African songs for children",
    comments: [
      {
        comment_id: new mongoose.Types.ObjectId(),
        author: "josephCode",
        body: "A wonderful show I highly recommend",
      },
    ],
    going: ["moonglade", "genie", "cakevealbladerunner", "groundhogdaylyrics"], //ammend with current members
    not_going: ["beeteaglepieapplepie"], //current members
  },
];

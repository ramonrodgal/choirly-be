const mongoose = require("mongoose");

exports.seedEvent = [
  {
    title: "African Childrens Choir in Concert",
    choir: "African Children's Choir",
    type: "Concert", //types are concert, and rehersal
    date: new Date("2022-01-20 18:00:00"),
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
    going: ["josephCode", "genie", "moonglade", "cakevealbladerunner"],
    not_going: ["korus76"],
  },
  {
    title: "Liverpool Cathedrals Christmas Carol Concert",
    choir: "Liverpool 64",
    type: "Concert", //types are concert, and rehersal
    date: new Date("2021-12-25 19:30:00"), //Date.now(), //Ass Christmas as a date
    location: "Liverpool Cathederal", //Check
    duration: 2,
    details: "Christmas Carols Service",
    comments: [
      {
        comment_id: new mongoose.Types.ObjectId(),
        author: "korus76",
        body: "Everybody welcome to join us in celebrating the spirit of Christmas",
      },
    ],
    going: ["genie", "moonglade", "cakevealbladerunner", "korus76"],
    not_going: ["josephCode"],
  },
  {
    title: "Chester Bach Singers Rehersal 2nd Feb 2022 ",
    choir: "Chester Bach Singers",
    type: "rehersal", //types are concert, and rehersal
    date: new Date("2022-02-02 20:00:00"), //Date.now(), //Ass Christmas as a date
    location: "Chester Community Hub", //Check
    duration: 1,
    details: "Weekly rehersal",
    comments: [
      {
        comment_id: new mongoose.Types.ObjectId(),
        author: "moonglade",
        body: "Weekly rehersals see you",
      },
    ],
    going: ["josephCode", "genie", "cakevealbladerunner", "korus76"],
    not_going: ["moonglade"],
  },
];

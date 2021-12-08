const mongoose = require("mongoose");

exports.seedGroupMessage = [
  {
    choir: "African Children's Choir",
    title: "We have received an award!",
    author: "cakevealbladerunner",
    body: "Our hard word supporting communities have been recognized by the London Music Institute",
    comments: [
      {
        author: "josephCode",
        body: "Yay!",
      },
      {
        author: "genie",
        body: "I'm so proud",
      },
    ],
  },
  {
    choir: "Liverpool 64",
    title: "MemberShip Renewals",
    author: "korus76",
    body: "Just a gentle reminder to everyone that annual membership fees are due this week",
    comments: [
      {
        author: "moonglade",
        body: "Thanks for the reminder I will BACS transfer my membership tonight",
      },
      {
        author: "cakevealbladerunner",
        body: "I will call you Monday to sort out",
      },
    ],
  },
  {
    choir: "Chester Bach Singers",
    title: "Its a baby girl",
    author: "genie",
    body: "Congratulations to Phillipa on her new arrival! We are looking forward to seeing baby Jessica soon",
    comments: [
      {
        author: "moonglade",
        body: "Thank you mum, baby and dad are all well see you all soon",
      },
      {
        author: "korus76",
        body: "Congratulations!!!",
      },
    ],
  },
];

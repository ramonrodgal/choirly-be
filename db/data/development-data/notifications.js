exports.seedNotification = [
  //Accepted to a choir
  {
    username: "josephCode",
    type: "accept",
    choir: "African Children's Choir",
    author: "cakevealbladerunner",
    accepted: true,
    read: false,
  },
  //A new message
  {
    username: "josephCode",
    type: "message",
    choir: "African Children's Choir",
    author: "cakevealbladerunner",
    read: true,
  },
  //A joining request
  {
    username: "cakevealbladerunner",
    type: "join",
    choir: "African Children's Choir",
    author: "josephCode",
    read: false,
    accepted: false,
  },
];

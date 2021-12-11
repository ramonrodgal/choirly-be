const mongoose = require("mongoose");

exports.seedChoir = [
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a148"),
    name: "African Children's Choir",
    location: "Manchester",
    description: `The African Children's Choir is made up of some of the neediest and most vulnerable children in their countries. Many have lost one or both parents to poverty or disease. The African Children's Choir helps these children break away from the everyday cycle of poverty and hopelessness. Before being selected to join the Choir, children, generally aged between 7 and 11 attend Music for Life camps. These camps are fun and stimulating environments that provide a break from the daily hardships the young children face at home.
    
    From the hundreds of children who attend the camps, approximately 50 will be chosen to audition for the Choir. Games, crafts, music and devotions are some of the activities the children look forward to at camp. Once the children are selected, Choir Teams will spend a few days visiting the children's homes to determine their needs and suitability for tour life. They then have the difficult task of selecting the group of children who will form the next African Children's Choir.`,
    avatar_url:
      "https://www.singers.com/group/images/AfricanChildrensChoir.jpg",
    social: {
      website: "https://www.singers.com/group/African-Childrens-Choir/",
      facebook: "https://www.facebook.com/africanchildrenschoir/",
    },
    leader: "cakevealbladerunner",
    members: [
      "josephCode",
      "genie",
      "moonglade",
      "cakevealbladerunner",
      "korus76",
    ],
    events: [], //Populate the events from the events data once this has been created
    files: [
      {
        _id: mongoose.Types.ObjectId("61b4e4a374b1b7ae06ba851e"),
        filename: "song.mp3",
        type: "song",
        path: "http://google.com",
      },
      {
        _id: mongoose.Types.ObjectId("61b4e4a374b1b7ae06ba851f"),
        filename: "songsheet.docx",
        type: "document",
        path: "http://google.com",
      },
      {
        _id: mongoose.Types.ObjectId("61b4e4a374b1b7ae06ba8520"),
        filename: "picture.jpeg",
        type: "image",
        path: "http://google.com",
      },
    ],
  },
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a14c"),
    name: "Liverpool 64",
    location: "Liverpool",
    description: `Liverpool64 was formed in 2018. It has grown quickly and as of May 2021 has over 100 members registered to sing across its soprano, alto, tenor and bass sections. The choir rehearses weekly on Monday evenings 6.30-8pm in the cathedral.`,
    avatar_url:
      "https://logovtor.com/wp-content/uploads/2021/04/liverpool-cathedral-logo-vector.png",
    social: {
      website:
        "https://www.liverpoolcathedral.org.uk/cathedral-music/our-choirs/liverpool-64/",
      facebook: "https://www.facebook.com/LiverpoolCathedral/",
      //  twitter:
      //  "https://twitter.com/LivCathedral?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
    },
    leader: "korus76",
    members: ["josephCode", "genie", "moonglade", "korus76"],
    events: [], //Populate the events from the events data once this has been created
    files: [
      {
        filename: "majestic symphony1.mp3",
        type: "song",
        path: "http://google.com",
      },
      {
        filename: "piano music sheets symphony1.pdf",
        type: "document",
        path: "http://google.com",
      },
      {
        filename: "rehearsal13thFeb2022.jpeg",
        type: "image",
        path: "http://google.com",
      },
    ],
  },
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a150"),
    name: "Chester Bach Singers",
    location: "Chester",
    description: `Chester Bach Singers, conducted by Martin Bussey,  is one of the finest chamber choirs in the North West of England. With its associated baroque Orchestra, Chester Bach Singers presents a season of concerts in and around Chester and has appeared in concert series across the UK. Established in September 1976, the 2016/17 season marked our 40th Anniversary Season.

    2020 has been a strange year for the choir; coronavirus took its toll on our 2019/20 and 2020/21 seasons, and has meant a complete overhaul of our forward planning. We are pleased to be able to offer our usual Christmas cheer on Saturday 18th December, and another of our famous Come And Sing workshops – Handel’s Coronation Anthems – on Saturday 5th February 2022. Book now to avoid missing out!`,
    avatar_url:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Chester_choir.jpg",
    social: {
      website: "https://www.chesterbachsingers.org.uk/",
      facebook: "https://www.facebook.com/ChesterBachSingers/",
      //instagram: "https://www.instagram.com/thebachchoir/?hl=en",
    },
    leader: "genie",
    members: [
      "josephCode",
      "genie",
      "moonglade",
      "cakevealbladerunner",
      "korus76",
    ],
    events: [], //Populate the events from the events data once this has been created
    files: [
      {
        filename: "Bach.mp3",
        type: "song",
        path: "http://google.com",
      },
      {
        filename: "choirtimetable.pdf",
        type: "document",
        path: "http://google.com",
      },
      {
        filename: "Christmascarols.jpeg",
        type: "image",
        path: "http://google.com",
      },
    ],
  },
];

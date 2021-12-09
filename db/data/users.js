const mongoose = require("mongoose");

exports.seedUser = [
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a140"),
    email: "example@email.com",
    username: "josephCode",
    avatar_url: "https://maxcdn.icons8.com/Share/icon/Cinema/avatar1600.png",
    about_me: "I love to sing",
    first_name: "Jonathan",
    last_name: "Ramon",
    phone_number: 07780862354,
    social: {
      youtube: "https://www.youtube.com/channel/UCWUGSN8Bb_c2QwPUfYmHwNA",
      facebook: "https://www.facebook.com/jonathan.joseph.357/",
      instagram: "https://www.instagram.com/jonathanjoseph76/",
    },
    voice: ["Alto"],
    Groups: ["Liverpool 64"],
  },
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a141"),
    email: "korus@email.com",
    username: "korus76",
    avatar_url: "https://avatarfiles.alphacoders.com/462/46209.jpg",
    about_me:
      "I am passionate about my singing and I love to contribute within a choir",
    first_name: "Jenny",
    last_name: "Clarke",
    phone_number: 07380822314,
    social: {
      youtube: "https://www.youtube.com/watch?v=SPITjuMAlqc",
      facebook: "https://www.facebook.com/BritainsGotTalent",
      instagram: "https://www.instagram.com/bgt/?hl=en",
    },
    voice: ["Bass"],
    Groups: ["Chester Bach Singers"],
  },
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a142"),
    email: "genie@email.com",
    username: "genie",
    avatar_url:
      "https://www.mlive.com/resizer/MBAHDDEgZbjaxo9cF_jyIvGM1is=/800x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/ETSJBFFEBNBCDG6BVGJWPZMVPI.jpg",
    about_me: "I am a single person with a passion for singing Soprano ",
    first_name: "Shaun",
    last_name: "Jackson",
    phone_number: 07280821314,
    social: {
      youtube: "https://www.youtube.com/watch?v=Ju3EUfA_Bzs",
      facebook: "https://www.facebook.com/sopranofficiel",
      instagram: "https://www.instagram.com/sopranopsy4/?hl=en",
    },
    voice: ["Soprano"], //Change
    Groups: ["African Children's Choir"],
  },
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a143"),
    email: "moonglade@email.com",
    username: "moonglade",
    avatar_url: "https://pngimg.com/uploads/avatar/avatar_PNG37.png",
    about_me: "I like to sing in the glare of a full moon",
    first_name: "Phillipa",
    last_name: "Daniels",
    phone_number: 07240821334,
    social: {
      youtube: "https://www.youtube.com/watch?v=fnPZV_l-tDk",
      facebook:
        "https://www.facebook.com/pages/Heritage-Mass-Choir-Tenor/161095587247322",
      instagram: "https://www.instagram.com/the_idiots_of_tenor_bass_choir/",
    },
    voice: ["Tenor"], //Change
    Groups: ["African Children's Choir"],
  },
  {
    _id: mongoose.Types.ObjectId("61b0c4c065064fdfb889a144"),
    email: "cakevealbladerunner@email.com",
    username: "cakevealbladerunner",
    avatar_url:
      "https://www.iconspng.com/images/female-cartoon-avatar/female-cartoon-avatar.jpg",
    about_me: "I love baking and singing",
    first_name: "Beth",
    last_name: "Taylor",
    phone_number: 07450831334,
    social: {
      youtube: "https://www.youtube.com/watch?v=_nP7oiZIl1M",
      facebook: "https://www.facebook.com/bethmtaylormezzo/",
    },
    voice: ["Mezzo-Soprano"], //Change
    Groups: ["Liverpool 64"],
  },
];

//moonglade, genie, cakevealbladerunner, groundhogdaylyrics, beeteaglepieapplepie
//Bass, Baritone, Tenor, Alto, Mezzo-Soprano, Soprano

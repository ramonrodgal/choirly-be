const mongoose = require('mongoose');
const User = require('../../schemas/users');
require('dotenv').config();
const {seedUser} = require('./seed');

mongoose.connect(process.env.DATABASE_URL).then(() =>{
    console.log('connected to db')
  }).catch(err => { 
    console.log(err);
  });

const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUser)
}

seedDB().then(()=>{
    mongoose.connection.close();
})

console.log(seedUser);
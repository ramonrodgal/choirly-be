const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL).then(() =>{
  console.log('connected to db')
}).catch(err => {
  console.log(err);
});

const app = express();
const port = 9000;



app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});

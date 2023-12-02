//variable for using the mongoose
const mongoose = require('mongoose');

//connection URL for connecting the Database
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_api');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
  console.log('Connected to Database');
});

module.exports = db;
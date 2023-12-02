//variable for using the mongoose
const mongoose = require('mongoose');

//connection URL for connecting the Database
mongoose.connect('mongodb+srv://priyanshadmin:admin@clustermain.vvg6gyt.mongodb.net/ecommerce_api/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
  console.log('Connected to Database');
});

module.exports = db;
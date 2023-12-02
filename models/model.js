//variable for the mongoose library
const mongoose = require('mongoose');

//defining the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  productID: { type: String, required: true, unique: true}
});

//initializing the newly created schema 
const Product = mongoose.model('Product', productSchema);

//exporting the schema to access it for Database operations
module.exports = Product;
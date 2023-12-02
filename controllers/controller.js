//variable for accessing the Product modal of database
const Product = require('../models/model');
//variable for accessing the mongoose libararies
const mongoose = require('mongoose');

//exporting controller for homepage or indexpage
module.exports.home = (req, res) => {
    return res.status(200).json({
        message: "Hi this is Homepage API"
    });
}
//exporting controller for adding Product
module.exports.addProduct = async (req, res) => {
    try {
        //creating new product for the database
        const newProduct = await new Product({
            name: req.body.name,
            quantity: req.body.quantity,
            productID: req.body.productID
        });
        //saving the created product
        const savedProduct = await newProduct.save();
        return res.status(200).json({
            message: "Product Added Successfully !",
            "product added is": savedProduct
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                error: 'Product ID already exists, please try again with different product id !'
            });
        }
        if (error._message === 'Product validation failed') {
            return res.status(422).json({
                error: 'Product validation failed, please check the form inputs again !'
            });
        }
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

//exporting controller for deleting Product
module.exports.deleteProduct = async (req, res) => {
    try {
        //finding the product by productID and deleting it
        const deletedProduct = await Product.findOneAndDelete({ productID: req.params.id });
        if(!deletedProduct){ // if no product found for deletion
            return res.status(404).json({
                message: "Product Not Found, please check the product ID !",
                "product deleted is": deletedProduct
            });
        }
        return res.status(200).json({
            message: "Product Deleted Successfully !",
            "product deleted is": deletedProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

//exporting controller for Displaying Product
module.exports.showProduct = async (req, res) => {
    try {
        //fetching all products to display
        const products = await Product.find({});
        if(!products || products.length === 0){ // if no product is updated or not found
            return res.status(200).json({
                message: "No Products in the Database !"
            });
        }
        return res.status(200).json({
            message: 'Products Fetched Successfully',
            'All products in the Database: ': products
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

//exporting controller for searching Product
module.exports.searchProduct = async (req, res) => {
    if(!req.query || Object.keys(req.query).length === 0){ //if the query is empty
        return res.status(422).json({
            error: 'Product not abled to search, please provide the query inputs !'
        });
    }
    try {
        const searchedProduct = await Product.find(req.query);
        if(!searchedProduct || searchedProduct.length === 0){ //if searched product is not found
            return res.status(404).json({
                message: "Product Not Found, please check the query entries !",
                "product searched is": searchedProduct
            });
        }
        return res.status(200).json({
            message: 'Product Searched Successfully !',
            "product searched is": searchedProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

//exporting controller for updating Product
module.exports.updateProduct = async (req, res) => {
    if((req.body && Object.keys(req.body).length > 0) && (req.query && Object.keys(req.query).length > 0)){ //if there is no wrong entries in query or body
        try {
            //finding the product and updating it
            const updatedProduct = await Product.findOneAndUpdate(req.query, { $set: req.body }, { new: true });
            if(!updatedProduct || updatedProduct.length === 0){ // if no product is updated or not found
                return res.status(404).json({
                    message: "Product Not Found, please check the query entries !",
                    "product updated is": updatedProduct
                });
            }
            return res.status(200).json({
                message: 'Product Updated Successfully !',
                "product updated is": updatedProduct
            });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({
                    error: 'Product ID already exists, please try again with different product id !'
                });
            }
            if (error instanceof mongoose.Error.CastError) {
                return res.status(422).json({
                    error: 'Product validation failed, please check the form inputs again !'
                });
            }
            return res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }else{ //for params or body error
        return res.status(501).json({
            message: "Query or Input Error, please check the entries again !",
        });
    }
}
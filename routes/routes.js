//variables required
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

//routes defined->
router.get('/', controller.home);
router.post('/add-product', controller.addProduct);
router.delete('/delete-product/:id', controller.deleteProduct);
router.get('/show-product', controller.showProduct);
router.get('/search-product', controller.searchProduct);
router.put('/update-product', controller.updateProduct);

//exporting the router for index file
module.exports = router;
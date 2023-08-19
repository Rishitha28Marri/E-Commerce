const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// Get all products
router.get('/products', productController.getAllProducts);

//Get products by ID
router.get('/products/:productId', productController.getProductById);

//Create new product
router.post('/products', productController.createProduct);

//Update product by ID
router.put('/products/:productId', productController.updateProduct);

//Delete product by ID
router.delete('/products/productId', productController.deleteProduct);

module.exports = router;

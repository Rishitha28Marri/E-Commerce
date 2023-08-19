const Product = require('../models/products');

const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },


// Get products by Id
  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Create a new product
  createProduct: async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Update a product by ID
  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
      res.json(updatedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Delete a product by ID
  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      await Product.findByIdAndDelete(productId);
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = productController;

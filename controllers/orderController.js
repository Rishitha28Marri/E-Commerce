const jwt = require('jsonwebtoken');
const Order = require('../models/orders');
const Product = require('../models/products');
const User = require('../models/users');

const orderController = {
  // Get all orders
  getAllOrders: async (req, res) => {
    try {
      const token = req.headers['authorization'];
      if (!token) {
        return res.status(401).json({ message: 'Authorization token not found' });
      }
      const decodedToken = jwt.verify(token, 'your-secret-key');
      const userId = decodedToken.userId;

      const orders = await Order.find({ user: userId }).populate('product', 'name price');
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Create a new order
  createOrder: async (req, res) => {
    try {
      const { products,user } = req.body;
      console.log(req.body)
      const token = req.headers['authorization'];
      if (!token) {
        return res.status(401).json({ message: 'Authorization token not found' });
      }
      const decodedToken = jwt.verify(token, 'your-secret-key');
      const userId = decodedToken.userId;

      for(let i=0;i<products.length;i++){
          const product = await Product.findById(products[i].product);
          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
          //const totalPrice = product.price * products[i].quantity;
        }
        //console.log(totalPrice)

      const order = new Order({
        user,
        products,
        // totalPrice: totalPrice,
      });

      await order.save();
      res.status(201).json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err});
    }
  },

  // Update an order by ID
  updateOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
      res.json(updatedOrder);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Delete an order by ID
  deleteOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      await Order.findByIdAndDelete(orderId);
      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = orderController;

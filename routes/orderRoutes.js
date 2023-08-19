const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET all orders
router.get('/orders', orderController.getAllOrders);

// POST create order
router.post('/orders', orderController.createOrder);

// PUT update order
router.put('/orders/:orderId', orderController.updateOrder);

// DELETE delete order
router.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;
const mongoose = require('mongoose');
const Product = require('./products');


const orderSchema = mongoose.Schema({


    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
     
    products: [

        {product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }
],

orderDate: {
        type: Date,
        default: Date.now,
    },

});

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;
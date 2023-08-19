const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = 3000;

// Connect to MongoDB (replace "YOUR_MONGODB_URI" with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/ecommerce-db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(cors());

// Routes
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

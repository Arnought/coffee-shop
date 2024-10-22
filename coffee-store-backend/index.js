const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const productRoutes = require('./routes/productRoutes');

const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Middleware

app.use(cors());

app.use(express.json());

// Routes

app.use('/api/products', productRoutes);

app.use('/api/cart', cartRoutes);

// MongoDB Connection

mongoose.connect('mongodb://localhost:27017/coffee-store', {

  useNewUrlParser: true,

  useUnifiedTopology: true,

}).then(() => {

  console.log('Connected to MongoDB');

  app.listen(5000, () => {

    console.log('Server running on port 5000');

  });
  
  // Get a specific product by ID
  app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  let cart = [];

// Get cart items
app.get('/cart', (req, res) => {
  res.json(cart);
});

// Add a product to the cart
app.post('/cart', (req, res) => {
  const { id, quantity } = req.body;
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Check if product is already in the cart
  const cartItem = cart.find(item => item.product.id === id);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  res.json(cart);
});

// Remove a product from the cart
app.delete('/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  cart = cart.filter(item => item.product.id !== productId);
  res.json(cart);
});

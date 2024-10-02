const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // To handle JSON data

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const products = require('./data/product');

// Get all products
app.get('/products', (req, res) => {
    res.json(products);
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
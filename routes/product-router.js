const express = require('express');
const productRouter = express.Router();
const auth = require('../middlewares/auth');

const {
  getAllProducts,
  getProduct,
  createProduct,
} = require('../controllers/product-controller');

productRouter.get('/api/products', getAllProducts);
productRouter.get('/api/products/:id', getProduct);
productRouter.post('/api/products', auth, createProduct);

module.exports = productRouter;

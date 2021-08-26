const express = require('express');
const ordersRouter = express.Router();
const {
  checkout,
  getAllOrders,
} = require('../controllers/order-controller.js');
const auth = require('../middlewares/auth.js');

ordersRouter.post('/api/checkout', checkout);
ordersRouter.get('/api/orders/me', auth, getAllOrders);

module.exports = ordersRouter;

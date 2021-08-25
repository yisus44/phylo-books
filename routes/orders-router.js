const express = require('express');
const ordersRouter = express.Router();
const { checkout } = require('../controllers/order-controller.js');

ordersRouter.post('/api/checkout', checkout);

module.exports = ordersRouter;

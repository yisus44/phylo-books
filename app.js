const helmet = require('helmet');
const cors = require('cors');

const { productRouter, userRouter, ordersRouter } = require('./routes/index');

const express = require('express');
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(ordersRouter);

// app.use(helmet());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

module.exports = app;

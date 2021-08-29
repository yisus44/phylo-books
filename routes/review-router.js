const express = require('express');
const reviewRouter = express.Router();
const {
  addReview,
  updateReview,
  getProductsReview,
  getReviewByField,
  getReviewById,
} = require('../controllers/review-controller.js');
const auth = require('../middlewares/auth.js');

reviewRouter.post('/api/review', auth, addReview);
reviewRouter.put('/api/review', auth, updateReview);
//get all request for a single product
reviewRouter.get('/api/review/products/:product_id', getProductsReview);
//this route is for knowing if a given user have given an review
reviewRouter.get('/api/review/products/:product_id/:user_id', getReviewByField);
reviewRouter.get('/api/review/:id', getReviewById);

module.exports = reviewRouter;

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

reviewRouter.get('/api/review/products/me', getReviewByField);
reviewRouter.get('/api/review/products', getProductsReview);
reviewRouter.get('/api/review/:id', getReviewById);

module.exports = reviewRouter;

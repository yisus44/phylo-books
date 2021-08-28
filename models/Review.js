const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reaction: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxLength: 140,
  },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;

const mongoose = require('mongoose');

const Review = require('../models/Review');

const reactions = ['LIKE', 'DISLIKE', 'REPORT'];

async function addReview(req, res) {
  try {
    const { user_id, product_id, reaction } = req.body;
    const product = product_id;
    const user = user_id;

    if (!reactions.includes(reaction)) {
      return res
        .status(400)
        .send({ error: `Reaction must be of type ${reactions} ` });
    }

    const alreadyExists = await Review.findOne({
      product,
      user,
    });
    if (!alreadyExists) {
      const newReview = new Review({ product, user, reaction });
      await newReview.save();
      return res.status(201).send(newReview);
    } else {
      return res.status(400).send({ error: 'Reaction already exists' });
    }
  } catch (error) {
    res.status(500).send();
    console.log(error);
  }
}

async function updateReview(req, res) {
  try {
    const { user_id, product_id, reaction } = req.body;
    const product = product_id;
    const user = user_id;

    const alreadyExists = await Review.findOne({
      product,
      user,
    });

    if (!reactions.includes(reaction)) {
      return res
        .status(400)
        .send({ error: `Reaction must be of type ${reactions} ` });
    }

    if (alreadyExists) {
      alreadyExists.reaction = reaction;
      alreadyExists.updatedAt = Date.now();
      const updatedReview = await alreadyExists.save();
      return res.status(201).send(updatedReview);
    } else {
      return res.status(400).send({ error: 'Reaction does not exists' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

async function getReviewByField(req, res) {
  try {
    const { user_id, product_id } = req.params;
    const product = product_id;
    const user = user_id;

    const alreadyExists = await Review.findOne({
      product,
      user,
    });
    return res.send(alreadyExists);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Something went wrong' });
  }
}
async function getProductsReview(req, res) {
  try {
    const { product_id } = req.params;
    const product = product_id;
    console.log(req.params)

    const reviews = await Review.find({
      product,
    });
    return res.send(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Something went wrong' });
  }
}
async function getReviewById(req, res) {
  try {
    const { id } = req.params;
    const _id = id;
    if (!_id) {
      return res.status(400).send({ error: 'Invalid or non-existing id' });
    }
    const review = await Review.findOne({
      _id,
    });
    return res.send(review);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Something went wrong' });
  }
}

module.exports = {
  addReview,
  updateReview,
  getReviewByField,
  getReviewById,
  getProductsReview,
};

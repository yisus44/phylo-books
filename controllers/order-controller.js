const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);
async function checkout(req, res) {
  const { amount, id, user_id, product_id } = req.body;
  console.log(user_id, product_id);
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Libro',
      payment_method: id,
      confirm: true,
    });
    const order = new Order({
      user: user_id,
      product: product_id,
      stripe_id: id,
    });
    await order.save();
    return res.send('succesful');
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.raw.message });
  }
}

async function getAllOrders(req, res) {
  const { _id } = req.user;
  const orders = await Order.find({ user: _id });
  const products = [];

  for (let order of orders) {
    const product = await Product.findOne({ _id: order.product });
    if (product) {
      products.push({ product, order });
    }
  }
  return res.status(200).send(products);
}

module.exports = {
  checkout,
  getAllOrders,
};

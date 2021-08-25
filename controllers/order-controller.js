const Order = require('../models/Order');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);
async function checkout(req, res) {
  const { amount, id } = req.body;
  console.log(stripe);
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Libro',
      payment_method: id,
      confirm: true,
    });

    await res.send('succesful');
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.raw.message });
  }
}

module.exports = {
  checkout,
};

const Product = require('../models/Product');

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    return res.send(products);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

async function getProduct(req, res) {
  try {
    const { id } = req.params || req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send();
    }
    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

async function createProduct(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(403).send();
    }
    const product = new Product(req.body);
    await product.save();
    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

module.exports = { getAllProducts, getProduct, createProduct };

const bcrypt = require('bcrypt');
const validator = require('validator');

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = process.env.SALT;

async function validateUser(name, email, password) {
  if (
    validator.isEmpty(name) ||
    validator.isEmpty(email) ||
    validator.isEmpty(password)
  ) {
    return false;
  } else if (
    !validator.isEmail(email) ||
    password.length <= 0 ||
    name.length <= 0
  ) {
    return false;
  } else {
    return true;
  }
}

async function hashPassword(password) {
  return await bcrypt.hash(password, Number(SALT_ROUNDS));
}

async function comparePassword(password, hashedPassword) {
  if (password.length <= 0) {
    return false;
  }
  return await bcrypt.compare(password, hashedPassword);
}

async function generateJWT(user) {
  return jwt.sign(user.toObject(), JWT_SECRET, {
    expiresIn: '1h',
  });
}

module.exports = {
  validateUser,
  hashPassword,
  comparePassword,
  generateJWT,
};

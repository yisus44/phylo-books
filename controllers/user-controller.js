const User = require('../models/User');
const {
  validateUser,
  hashPassword,
  generateJWT,
  comparePassword,
} = require('./user-utils');

async function signUp(req, res) {
  if (validateUser) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await hashPassword(password);

      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
      const jwt = await generateJWT(user);

      return res.status(201).send({
        user,
        token: jwt,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  } else {
    return res.status(400).send();
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const match = comparePassword(password, existingUser.password);
      if (match) {
        const jwt = await generateJWT(existingUser);
        const user = existingUser.toObject();

        res.send({ user, token: jwt });
      } else {
        return res.status(400).send();
      }
    } else {
      return res.status(400).send();
    }
  } catch (error) {
    return res.status(500).send();
  }
}

async function getUser(req, res) {
  //It retribies the info of the database just in case the token has outdated info
  const { _id } = req.user;
  const user = await User.findById({ _id });
  return res.send({ user });
}

module.exports = { signUp, signIn, getUser };

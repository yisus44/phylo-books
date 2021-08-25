const express = require('express');
const userRouter = express.Router();

const { signUp, signIn, getUser } = require('../controllers/user-controller');

const auth = require('../middlewares/auth');

userRouter.post('/api/users/signup', signUp);
userRouter.post('/api/users/signin', signIn);

userRouter.get('/api/users/me', auth, getUser);
userRouter.get('/api/users/me/orders', auth, async function (req, res) {});

userRouter.get('/', function (req, res) {
  res.send('hola esquizo');
});

module.exports = userRouter;

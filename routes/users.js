const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUser,
  updateUser,
  login,
  createUser,
} = require('../controllers/users');

usersRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().pattern(/^\S*$/).required().min(8),
  }),
}), login);
usersRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().pattern(/^\S*$/).required().min(8),
  }),
}), createUser);
usersRouter.get('/users/me', auth, getUser);
usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), auth, updateUser);

module.exports = usersRouter;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const sendToken = (res, user) => {
  // создадим токен
  const token = jwt.sign(
    { _id: user._id },
    NODE_ENV === 'production' ? JWT_SECRET : 'strong-protection',
    { expiresIn: '7d' }, // токен будет просрочен через неделю после создания
  );
  // вернём токен
  res.send({ token });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      sendToken(res, user);
    })
    .catch((e) => {
      if (e.code === 11000) {
        const err = new Error('Пользователь с данным email уже зарегистрирован');
        err.statusCode = 409;
        next(err);
      }
      next(e);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      sendToken(res, user);
    })
    .catch(() => {
      const err = new Error('Неверный email или пароль');
      err.statusCode = 401;
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('Данные по запросу не найдены'))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((e) => {
      if (e.message === 'Данные по запросу не найдены') {
        e.statusCode = 404;
        next(e);
      } else if (e.name === 'CastError') {
        const err = new Error('Переданы некорректные данные');
        err.statusCode = 400;
        next(err);
      }
      next(e);
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch(next);
};

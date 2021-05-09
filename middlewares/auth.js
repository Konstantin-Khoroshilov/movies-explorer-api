const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new Error('Необходимо авторизоваться');
    err.statusCode = 401;
    next(err);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'strong-protection');
  } catch (e) {
    const err = new Error('Необходимо авторизоваться');
    err.statusCode = 401;
    next(err);
  }
  req.user = payload;
  next();
};

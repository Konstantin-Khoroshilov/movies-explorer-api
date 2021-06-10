const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const regExLink = /(^https?:\/\/www\.[0-9a-z-]+\.[0-9a-z-]{2,}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]+)?$)|(^https?:\/\/[^www][0-9a-z-]+\.[0-9a-z-]{2,}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]+)?$)/i;
const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('/movies', auth, getMovies);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
}), auth, deleteMovie);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExLink),
    trailer: Joi.string().required().pattern(regExLink),
    thumbnail: Joi.string().required().pattern(regExLink),
    movieId: Joi.string().hex().required().length(24),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), auth, createMovie);

module.exports = router;

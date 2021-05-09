const Movie = require('../models/movie');

function errorHandler(e, next) {
  if (e.message === 'notFound') {
    const err = new Error('Данные по запросу не найдены');
    err.statusCode = 404;
    next(err);
  } else if (e.name === 'CastError') {
    const err = new Error('Переданы некоррекные данные');
    err.statusCode = 400;
    next(err);
  } else {
    const err = new Error('На сервере произошла ошибка');
    err.statusCode = 500;
    next(err);
  }
}

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => { res.send(movies); })
    .catch((e) => { errorHandler(e, next); });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new Error('notFound'))
    .then((movie) => {
      if (String(movie.owner) === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .orFail(new Error('notFound'))
          .then((deletedMovie) => { res.send(deletedMovie); })
          .catch((e) => { errorHandler(e, next); });
      } else {
        const err = new Error('Недостаточно прав для выполнения запроса');
        err.statusCode = 403;
        next(err);
      }
    })
    .catch((e) => { errorHandler(e, next); });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => { res.send(movie); })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new Error('Переданы некоррекные данные');
        err.statusCode = 400;
        next(err);
      } else {
        const err = new Error('На сервере произошла ошибка');
        err.statusCode = 500;
        next(err);
      }
    });
};

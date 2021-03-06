const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(^https?:\/\/www\.[0-9a-z-]+\.[0-9a-z-]{2,}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]+)?$)|(^https?:\/\/[^www][0-9a-z-]+\.[0-9a-z-]{2,}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]+)?$)/i.test(v);
      },
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(^https?:\/\/www\.[0-9a-z-]+\.[0-9a-z-]{2,}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]+)?$)|(^https?:\/\/[^www][0-9a-z-]+\.[0-9a-z-]{2,}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]+)?$)/i.test(v);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(^https?:\/\/www\.[0-9a-z-]+\.[0-9a-z-]{2,}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]+)?$)|(^https?:\/\/[^www][0-9a-z-]+\.[0-9a-z-]{2,}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]+)?$)/i.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

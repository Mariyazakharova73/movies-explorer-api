const { celebrate, Joi } = require('celebrate');
const { LINK_CHECKING } = require('./constants');

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(100),
    director: Joi.string().required().min(2).max(50),
    duration: Joi.number().integer().required().min(2)
      .max(10),
    year: Joi.string().required().min(4).max(10),
    description: Joi.string().required().min(10),
    image: Joi.string().required().pattern(LINK_CHECKING),
    trailerLink: Joi.string().required().pattern(LINK_CHECKING),
    thumbnail: Joi.string().required().pattern(LINK_CHECKING),
    nameRU: Joi.string().required().min(2).max(50),
    nameEN: Joi.string().required().min(2).max(50),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

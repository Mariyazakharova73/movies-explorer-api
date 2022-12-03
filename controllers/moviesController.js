const Movie = require('../models/movieModel');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Нет фильма с таким id');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Фильм другого пользователя');
      }
      return Movie.findByIdAndRemove(req.params.movieId).then(() => res.send(movie));
    })
    .catch(next);
};

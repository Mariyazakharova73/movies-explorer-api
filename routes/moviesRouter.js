const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/moviesController');
const { validateMovieId, validateMovie } = require('../utils/validation');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм
router.post('/movies', validateMovie, createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:_id', validateMovieId, deleteMovie);

module.exports = router;

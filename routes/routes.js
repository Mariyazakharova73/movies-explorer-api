const router = require('express').Router();
const {
  updateUserMe,
  getUserMe,
} = require('../controllers/userController');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/moviesController');
const { validateUserInfo, validateMovieId, validateMovie } = require('../utils/validation');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUserMe);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', validateUserInfo, updateUserMe);

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм
router.post('/movies', validateMovie, createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = router;

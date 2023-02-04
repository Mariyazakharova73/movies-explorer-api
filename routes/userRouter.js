const router = require('express').Router();
const { updateUserMe, getUserMe } = require('../controllers/userController');
const { validateUserInfo } = require('../utils/validation');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUserMe);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', validateUserInfo, updateUserMe);

module.exports = router;

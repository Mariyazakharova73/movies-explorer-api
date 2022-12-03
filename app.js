const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/routes');
const { createUser, login } = require('./controllers/userController');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { validateLogin, validateUser } = require('./utils/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsSetting = require('./middlewares/cors-setting');

const { PORT = 3000 } = process.env;
const app = express();
// пишем выше роутинга
app.use(cors());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger); // подключаем логгер запросов
app.use(corsSetting);
app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);
app.use(auth, router);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Неправильный URL или метод'));
});

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT);

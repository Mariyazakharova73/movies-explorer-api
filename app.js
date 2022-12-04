const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/moviesRouter');
const { createUser, login } = require('./controllers/userController');
const { errorHandler } = require('./errors/errorHandler');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { validateLogin, validateUser } = require('./utils/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsSetting = require('./middlewares/cors-setting');
const { PORT_CONFIG, DB_CONFIG } = require('./utils/config');

const app = express();
// пишем выше роутинга
app.use(cors());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger); // подключаем логгер запросов
app.use(corsSetting);
app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);
app.use(auth, movieRouter);
app.use(auth, userRouter);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Неправильный URL или метод'));
});

mongoose.connect(DB_CONFIG);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT_CONFIG);

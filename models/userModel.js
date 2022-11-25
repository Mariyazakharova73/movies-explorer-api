const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const AuthorisationError = require('../errors/auth-err');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Мария',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Неверный email'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function auth(email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(
          new AuthorisationError('Неправильные почта или пароль'),
        );
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthorisationError('Неправильные почта или пароль'),
          );
        }
        return user; // теперь user доступен
      });
    });
};

module.exports = mongoose.model('user', userSchema);

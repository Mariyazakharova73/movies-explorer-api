const { BAD_REQUEST_ERROR } = require('../utils/constants');

class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR;
  }
}

module.exports = IncorrectDataError;

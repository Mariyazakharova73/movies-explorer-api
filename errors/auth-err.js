const { UNAUTHORIZAD_ERROR } = require('../utils/constants');

class AuthorisationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZAD_ERROR;
  }
}

module.exports = AuthorisationError;

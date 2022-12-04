const { NODE_ENV, PORT, URL_DB } = process.env;

const PORT_CONFIG = NODE_ENV === 'production' ? PORT : 3000;
const DB_CONFIG = NODE_ENV === 'production' ? URL_DB : 'mongodb://localhost:27017/moviesdb';

module.exports = {
  PORT_CONFIG,
  DB_CONFIG,
};

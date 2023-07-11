const {
  DATABASE: { name, username, password, options },
} = require('../../config');

module.exports = {
  development: {
    username: username,
    password: password,
    database: name,
    ...options,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};

const { version } = require('../package.json');

module.exports = {
  VERSION: version,
  SERVER: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 4000,
  },
  DATABASE: {
    name: process.env.DB_NAME || 'todo',
    username: process.env.DB_USER_NAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    options: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      pool: {
        max: 100,
        min: 0,
        acquire: 1000 * 100,
        idle: 1000,
      },
    },
  },
};

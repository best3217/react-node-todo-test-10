const Sequelize = require('sequelize');

const {
  DATABASE: { name, username, password, options },
} = require('../config');

const sequelize = new Sequelize(name, username, password, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;

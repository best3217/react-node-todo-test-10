const express = require('express');
const cors = require('cors');

const sequelize = require('./database/DBConnection');
const routes = require('./routes/index');

const {
  SERVER: { port },
} = require('./config');

const server = express();

const app = server.listen(port);

try {
  sequelize
    .authenticate()
    .then(async () => {
      console.log('Connection to database has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });

  server.use(cors({ origin: 'http://localhost:3000' }));
  server.use(
    express.urlencoded({
      extended: true,
    })
  );
  server.use(express.json());
  server.use('/lists', routes);
} catch (e) {
  server.close();
}

module.exports = server;

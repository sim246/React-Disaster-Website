const express = require('express');
const registerRoutes = require('./api.js');

// eslint-disable-next-line no-unused-vars
const DB = require('./db/db.js');

const app = express();

app.use(express.static('../client/build'));

registerRoutes(app);

app.use(function (req, res, next) {
  res.status(404).send({status: '404', message: 'Sorry cant find that!'});
  next();
});

module.exports = app;
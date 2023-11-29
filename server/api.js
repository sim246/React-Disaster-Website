const express = require('express');
const apiroutes = require('./api/routes.js');
const compression = require('compression');

function registerMiddlewares(app) {
  app.use(express.json());
}
function registerApiRoutes(app) {
  app.use(apiroutes);
  app.use(compression());
}

function registerErrorHandlers(app) {
  app.use(function (req, res, next) {
    res.status(404).send({status: '404', message: 'Sorry cant find that!'});
    next();
  });  
}

function registerRoutes(app) {
  registerMiddlewares(app);
  registerApiRoutes(app);
  registerErrorHandlers(app);
}

module.exports = registerRoutes;

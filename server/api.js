const express = require('express');
const apioutes = require('./api/routes.js');

function registerMiddlewares(app) {
  app.use(express.json());
}
function registerApiRoutes(app) {
  app.use(apioutes);
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
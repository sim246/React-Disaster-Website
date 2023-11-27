const express = require('express');
const registerRoutes = require('./api.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Impact of Natural Disasters on the Economy App',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from TODO.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./api/routes.js'],
};
const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static('../client/build'));

registerRoutes(app);

app.use(function (req, res, next) {
  res.status(404).send({status: '404', message: 'Sorry cant find that!'});
  next();
});



module.exports = app;
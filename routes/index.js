const express = require('express');
const usersRoute = require('./users');
const moviesRoute = require('./movies');

const routes = express();

routes.use(usersRoute);
routes.use(moviesRoute);

module.exports = routes;

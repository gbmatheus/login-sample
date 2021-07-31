const express = require('express');

const routes = express.Router();

const UserRoutes = require('./routes/UserRouter');

routes.use(UserRoutes);

module.exports = routes;

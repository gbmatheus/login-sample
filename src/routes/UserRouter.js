const Router = require('express').Router;
const UserController = require('../controllers/UserController');

const routes = new Router();

routes.get('/users', UserController.index);
routes.get('/users/:code', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:code', UserController.update);
routes.delete('/users/:code', UserController.remove);

module.exports = routes;

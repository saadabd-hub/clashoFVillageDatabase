const route = require('express').Router();
const userController = require('../controller/userController');

route.post('/register', userController.register);
route.post('/login', userController.login);

module.exports = route;
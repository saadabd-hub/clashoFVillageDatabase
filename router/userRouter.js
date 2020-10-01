const route = require('express').Router();
const userControl = require('../controller/userController');

route.post('/register', userControl.register);
route.post('/login', userControl.login);

module.exports = route;
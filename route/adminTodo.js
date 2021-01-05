const router = require('express').Router();
const authorization = require('../middleware/authorization');
const adminTodoController = require('../controller/adminTodoController');

router.post('/:id', authorization.adminAuthorization, adminTodoController)
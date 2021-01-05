const router = require('express').Router();
const authorization = require('../middleware/authorization');
const userTodoController = require('../controller/userTodoController');

router.get('/profiles/:id', authorization.userAuthorization, userTodoController.profile);
router.put('/profiles/:id', authorization.userAuthorization, userTodoController.changeProfile);
router.post('/profiles/address/:id', authorization.userAuthorization, userTodoController.addAddress);

module.exports - router;
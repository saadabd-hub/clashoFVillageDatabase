const router = require('express').Router();
const auth = require('../auth/authentication');
const userRoute = require('./userRouter');

const errorHandler = require('../middleware/errorHandler');

router.use('/users', userRoute);
router.use(auth);

router.use(errorHandler);

module.exports = router;
const router = require('express').Router();
const auth = require('../auth/authentication');
const userRoute = require('./userRouter');
const userTodoRoute = require('./userTodo');
const adminTodoRoute = require('./adminTodo');
const productRoute = require('./product');
const cartRoute = require('./cart');
const checkoutRoute = require('./checkout');

const errorHandler = require('../middleware/errorHandler');

router.use('/user', userRoute);
router.use('/products', productRoute);
router.use(auth);
router.use('/admin', adminTodoRoute);
router.use('/user', userTodoRoute);
router.use('/cart', cartRoute);
router.use('/checkout', checkoutRoute);
router.use(errorHandler);

module.exports = router;
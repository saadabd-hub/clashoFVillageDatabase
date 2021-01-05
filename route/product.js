const router = require('express').Router();
const productController = require('../controller/ProductController');

router.get('/cart', productController.cartView)

router.get('', productController.productAll)

router.get('/:id', productController.productById)

router.get('/picture/:productId', productController.showPicture)

router.get('/sort/:category', productController.productByCategory)

router.param('productId', productController.productById)



module.exports = router;
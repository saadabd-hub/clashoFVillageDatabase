const router =require('express').Router();
const authorization =require('../middleware/authorization');
const CartController =require('../controller/cartController')

router.post('/:id',authorization.userAuthorization, CartController.addProduct)

router.put('/:id',authorization.userAuthorization, CartController.putProduct)

router.delete('/:id',authorization.userAuthorization, CartController.deleteProduct)

router.get('/sum/:id', authorization.userAuthorization, CartController.sumCart);

router.get('/:id', authorization.adminAuthorization, CartController.seeAll);

module.exports = router;
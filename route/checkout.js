const router = require('express').Router();
const authorization = require('../middleware/authorization');
const checkoutController = require('../controller/CheckoutController')
const addressController = require('../controller/AddressController');


router.post('/add',(req, res)=>{
    res.send('Add an address');
});

router.post('/proceed/:id', authorization.userAuthorization, addressController.addressInterceptor, checkoutController.proceed)

router.get('/:id',authorization.userAuthorization, checkoutController.list);

router.get('/id',(req, res)=>{
    res.send(`Order's detail`);
});


module.exports = router;
const Order = require('../model/Order');
const Cart = require('../model/Cart');
const Product = require('../model/Product');
const User = require('../model/User');

class addressController {

    static addressInterceptor (req, res, next) {
        User.findById(req.params.id)
            .then((user)=>{
                if(user.address.length == 0){
                   throw { name: 'ADDRESS_NOT_FOUND'}
                }else next()
            }).catch(next)
    }

}

module.exports = ('addressController', addressController )
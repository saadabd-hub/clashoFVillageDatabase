const User = require('../model/User');
const Product = require('../model/Product');
const Cart = require('../model/Cart');

class cartController {

    static addProduct(req, res, next) {
        const { id } = req.body
        var qty;
        if (req.body.totalRequest) {
            qty = req.body.totalRequest
        } else {
            qty = 1;
        }
        Product.findById(id)
            .then((product) => {
                return Cart.find({ _productId: id, _userId: req.params.id })
                    .then((cart) => {
                        if (cart.length === 0) {
                            const carts = new Cart({
                                _userId: req.params.id,
                                _productId: id,
                                productName: product.productName,
                                thumbnailPicture: product.thumbnailPicture,
                                picture: product.picture,
                                price: product.price,
                                briefDescription: product.briefDescription,
                                category: product.category,
                                stock: req.body.totalRequest,
                                totalPrice: req.body.totalRequest * product.price,
                            })
                            return carts.save()
                        } else {
                            const totalStock = cart[0].stock + qty
                            const totalPrice = cart[0].price * totalStock;
                            return Cart.findByIdAndUpdate(cart[0]._id, { $set: { stock: totalStock, totalPrice: totalPrice } });
                        }
                    }).then((cart) => {
                        return Cart.findById(cart._id)
                    }).then((cart) => {
                        res.status(200).json({ success: true, data: [cart.productName,cart.stock,cart.price,cart.totalPrice] })
                    }).catch(next)
            })
    }

    static putProduct(req, res, next) {
        const { id } = req.body

        Product.findById(id)
            .then((product) => {
                if (product.stock < req.body.totalRequest) {
                    throw { name: 'NOT_ENOUGH' }
                } else {
                    const totalPre = product.stock - req.body.totalRequest;
                    return Product.findOneAndUpdate({ _id: id }, { $set: { stock: totalPre } })
                }
            })
            .then((product) => {
                Cart.findOne({ _productId: id })
                    .then((cart) => {
                        if (cart) {
                            return Cart.findOneAndUpdate({ _id: cart._id }, { $set: { stock: req.body.totalRequest + cart.stock } })
                        } else {
                            const cart = new Cart({
                                _userId: req.params.id,
                                _productId: id,
                                productName: product.productName,
                                thumbnailPicture: product.thumbnailPicture,
                                picture: product.picture,
                                price: product.price,
                                briefDescription: product.briefDescription,
                                category: product.category,
                                stock: req.body.totalRequest
                            })
                            return cart.save();
                        }
                    })
                    .then(() => {
                        Cart.findOne({ _productId: id })
                            .then((cart) => {
                                const totalPrice = cart.price * cart.stock;
                                return Cart.findOneAndUpdate({ _productId: id }, { $set: { totalPrice: totalPrice, _userId: req.params.id } });
                            })
                            .then((cart) => {
                                res.status(200).json({ success: true, data: [cart.stock,cart.productName] })
                            })
                    })
                    .catch(next)
            })
    }


    static deleteProduct(req, res, next) {
        const { id } = req.body

        Cart.findOne({ _productId: id })
            .then((cart) => {
                Product.findById(id)
                    .then((product) => {
                        const totalPre = cart.stock + product.stock;
                        cart.remove()
                        return Product.findOneAndUpdate({ _id: id }, { $set: { stock: totalPre } })
                    })
                    .then((product) => {
                        res.status(200).json({ success: true, deleted: product.productName })
                    }).catch(next)
            })
            .catch(next)
    }

    static sumCart(req, res, next) {

        Cart.find()
            .then((cart) => {
                if (cart) {
                    res.status(200).json({ success: true, data: cart })
                } else { console.log(111111111111); }
            })
    }

    static seeAll(req, res, next) {
        console.log(req.params.id);
        Cart.find()
            .then((cart) => {
                res.status(200).json({
                    success: true,
                    productNumber: cart.length,
                    data: cart
                });
            })
            .catch(next)
    }
}


module.exports = cartController;
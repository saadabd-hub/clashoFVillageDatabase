const Order = require('../model/Order');
const Cart = require('../model/Cart');
const Product = require('../model/Product')

class checkoutController {
    static proceed (req, res, next){
        const {cartId, productId}=req.body
        console.log(111111111);
        Cart.findOne({_id:cartId})
            .then((cart)=>{
                Product.findById (productId)
                .then((product)=>{
                    if(product.stock < cart.stock){
                        console.log('ini masuk ke if');
                        console.log('product.stock',product.stock);
                        console.log('cart.stock',cart.stock);
                        // return res.status(200).json({success:false,message:'not enough'})
                        throw {name:'NOT_ENOUGH'}
                    }else {
                        console.log(33333333);
                        const totalPre=product.stock-cart.stock;
                        return Product.findOneAndUpdate({_id:productId},{$set:{stock:totalPre}})
                    }
                })
                Cart.findById(cartId)
                .then((cart)=>{
                    Order.findOne({_id:cart._id})
                        .then((orders)=>{
                            if(orders==null){
                                const order = new Order ({
                                    _id:cart._id,
                                    _userId:req.params.id,
                                    _productId:productId,
                                    productName:cart.productName,
                                    thumbnailPicture:cart.thumbnailPicture,
                                    picture:cart.picture,
                                    price:cart.price,
                                    briefDescription:cart.briefDescription,
                                    category:cart.category,
                                    stock:cart.stock,
                                    totalPrice:cart.totalPrice,
                                })
                                return order.save()
                                    .then (()=>{
                                        res.status(200).json({success:true})
                                    })
                            }else{
                                const totalStock=orders.stock+cart.stock
                                const totalPrice=orders.totalPrice+cart.totalPrice;
                                return Order.findOneAndUpdate({_productId:cart._productId},{$set:{stock:totalStock, totalPrice:totalPrice}});
                            }

                        })
                })
                .then(()=>{
                    // hapus cart
                    Cart.findById(cartId)
                        .then((cart)=>{
                            return cart.remove();
                        })
                        .then((cart) => {
                            res.status(200).json({ success:true, deleted:cart.productName })
                        })
                })
                .catch(next)
                }).catch(next)
            }




    static list (req, res, next){
        Order.find({_userId:req.params.id})
            .then((order)=>{
                res.status(200).json({success:true, data:order.productName})
            })
        }
}
module.exports = checkoutController;

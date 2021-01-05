const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    _productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    productName:{type: String, required: true},
    thumbnailPicture:{type: Buffer, contentType: String},
    picture:{type:Buffer, contentType: String},
    price: {type: Float, required: true},
    stock: {type: Number, default:0},
    category: String,
    createdDate: {type: Date, default: Date.now()},
    createdBy: String},
    {collection: 'Cart', autoIndex: true});

module.exports = mongoose.model('Cart', cartSchema);
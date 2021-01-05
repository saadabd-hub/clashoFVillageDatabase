const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const productSchema = new mongoose.Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productName: {type: String, required: true},
    thumbnailPicture: {type: Buffer, contentType: String},
    picture:{ type: Buffer, contentType: String},
    description: {type: String, default:'Not described yet'},
    price: {type: Float, required: true},
    stock: {type: Number, default:0},
    category: String,
    createdDate: {type: Date, default: Date.now()},
    createdBy: {type: String, default: 'Admin'},
    editedDate: Date,
    editedBy: String,
    deletedDate: Date,
    deletedBy: String,
    like: {type: Number, default: 0},
    feedback: [{
        userName: {type:String, required: true},
        comment: {type: String, minlength:2, maxlength:100}
    }]
});

productSchema.pre('validate', function(next){
    if(this.feedback.length > 10) throw ('only first ten comments belong here')
    next()
})

module.exports = mongoose.model('Product', productSchema);
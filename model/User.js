const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, default: 'user'},
    lastName : String,
    age: Number,
    address: [{
        country: String,
        province: String,
        district: String,
        subDistrict: String,
        village: String,
        postalCode: String,
        detailedAddress: String,
        phoneNumber: String,
    }],
    role: {type: Number, default: 2},
    memberSince: {type: Date, default: Date.now()}
})

userLogSchema.pre('save', function(next){
    User.findOne({ username: this.username, email: this.email})
    .then((user)=>{
        if(user) next({ name: 'ALREADY_EXISTS'});
        else {
            const salt = bcrypt.genSaltSync(10);
            this.password = bcrypt.hashSync(this.password, salt);
            next();
        }
    })
    .catch((err) => next({name: 'DATABASE_ERROR'}));
});
const User = mongoose.model('User', userSchema);
module.exports = User;
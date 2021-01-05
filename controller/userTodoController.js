const User = require('../model/User');

class userTodoController {
    static profile(req,res,next){
        req.header
        User.findById(req._id)
        .then ((user) =>{
            res.status(201).json({
                success: true,
                data: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    address: user.address
                }
            });
        })
    };

    static changeProfile (req,res,next){
        User.findById(req.params.id)
        .then((user)=>{
            if(user){
                return User.findOneAndUpdate(
                    {_id: req._id},
                    {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        address: [req.body.address]
                    }
                )
                .then((user)=>{
                    res.status(200).json({success: true, data: user})
                })
            } else throw {name : 'NOT_FOUND'}
        })
        .then((user)=>{
            res.status(200).json({
                success: true,
                messsage: 'Data successfully updated',
                data: user,
            });
        })
        .catch (next)
    };

    static addAddress (req, res, next){
        User.findById(req.params.id)
        .then((user)=>{
            return User.findOneAndUpdate(
                {_id: req._id},
                {$push:{address: req.body.address}}
            )
        })
        .then((user)=>{
            res.status(200).json({
                success:true,
                messsage: 'Address added',
                data: user
            })
        })
    }
}

module.exports = ('userTodoController', userTodoController)
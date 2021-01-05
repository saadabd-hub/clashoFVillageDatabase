const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class userController {
    static register(req, res, next){
        const {username, email, password, firstName, lastName} = req.body;
        const user = new User({username, email, password, firstName, lastName});
        user
            .save()
            .then((user) => {
                res.status(201).json({
                    success: true,
                    data: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    }
                });
            })
            .catch(next);
    }

    static login(req, res, next){
        const {username, password} = req.body;
        User.findOne({username})
            .then((user)=>{
                if(user && bcrypt.compareSync(password, user.password)){
                    const access_token = jwt.sign({_id: user.id}, 'ASSIGNMENT');
                    res.status(200).json({
                        success: true,
                        access_token,
                        user
                    });
                } else throw{name: 'LOGIN_FAILED'};
            })
            .catch(next);
    }
}

module.exports = userController;
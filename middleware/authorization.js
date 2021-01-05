const User = require('../model/User');


class authorization{
    static userAuthorization (req, next){
        User.findById(req.params.id)
        .then((user)=>{
            if(user){
                if(user._id.toString() === req._id){
                    if(user.role > 2){
                        throw {name : 'BANNED'}
                    } else next()
                } else throw {name : 'FORBIDDEN'}
            } else throw {name : 'NOT_FOUND'}
        })
        .catch (next);
    };

    static adminAuthorization (req, next){
        User.findById(req.params.id)
        .then((user)=>{
            if(user){
                if(user._id.toString() === req._id){
                    if(user.role <= 1){
                        next();
                    } else throw {name: 'ADMIN_ONLY'}
                } else throw {name: 'FORBIDDEN'}
            } else throw {name: 'NOT_FOUND'}
        })
        .catch (next);
    };
}

module.exports = authorization;
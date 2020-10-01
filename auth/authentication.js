const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const {access_token} = req.headers;
    if (access_token){
        jwt.verify(access_token, 'ASSIGNMENT', (err, decoded) =>{
            if(err) next({name: 'INVALID_TOKEN'});
            else {
                req._userID = decoded._id;
                next();
            }
        });
    } else next({name: 'MISSING_TOKEN'});
}

module.exports = auth;
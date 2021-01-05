const errorHandler = (err, req, res, next) => {
    let code;
    let name= err.name;
    let message;

    switch (name) {
        case 'ALREADY_EXISTS':
            code = 409;
            message = 'Already exists!';
        break;
        case 'DATABASE_ERROR':
            code = 500;
            message = 'Database error!';
        break;
        case 'LOGIN_FAILED':
            code = 401;
            message = 'Username or password is incorrect!';
        break;
        case 'INVALID_TOKEN':
            code = 401;
            message = 'Invalid access token!';
        break;
        case 'MISSING_TOKEN':
            code = 401;
            message = 'Missing access token!';
        break;
        case 'NOT_FOUND':
            code=404;
            message='Email or Password combination not found';
            break;
        case 'BANNED':
            code=404;
            message='this account is suspended';
            break;
        case 'ADMIN_ONLY':
            code=404;
            message='Are you trying to break in';
            break;
        case 'NOT_ENOUGH':
            code=404;
            message='Out of stock';
            break;
        case 'ADDRESS_NOT_FOUND':
            code=404;
            message='Address not found';
            break;
        case 'FORBIDDEN':
            code=403;
            message='No access';
            break;
        case 'USER_INVULNERABLE':
            code=403;
            message=`this user have less than 50 soldiers OR you entered zero?!`;
            break;
        default:
            code=500;
            message='Internal server error';
            console.log(err);
            break;
    }
    res.status(code).json({
        success: false,
        message
    });
}

module.exports = errorHandler;
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
            message = 'Missing access token!'
    }
    res.status(code).json({
        success: false,
        message
    });
}

module.exports = errorHandler;
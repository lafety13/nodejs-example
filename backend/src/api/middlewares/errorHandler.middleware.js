const { validationResult } = require('express-validator/check');
const httpStatus = require('http-status');

const { env } = require('../../config/vars');
const ApiError = require('../errors/ApiError');

exports.errorConverter = (err, req, res, next) => {
    let convertedError = err;
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
        convertedError = new ApiError({
            message: 'Validation error',
            errors: validationError.mapped(),
            status: err.status || httpStatus.UNPROCESSABLE_ENTITY,
            stack: err.stack
        });
    } else if (!(err instanceof ApiError)) {
        convertedError = new ApiError({
            message: err.message,
            status: err.status,
            stack: err.stack,
        });
    }

    next(convertedError);
};

exports.errorHandler = (err, req, res, next) => {
    if (!err) {
        return next();
    }

    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
        stack: err.stack,
    };

    if (env !== 'development') {
        delete response.stack;
    }

    res.status(err.status || 500).json(response);
};

exports.error404Handler = (req, res, next) => {
    const built404Error = new ApiError({
        message: 'Not found',
        status: httpStatus.NOT_FOUND,
    });

    return this.errorHandler(built404Error, req, res, next);
};

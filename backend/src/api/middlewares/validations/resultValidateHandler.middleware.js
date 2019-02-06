const { validationResult } = require('express-validator/check');

module.exports = (request, response, next) => {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
        validationErrors.throw();
    }
    next();
};

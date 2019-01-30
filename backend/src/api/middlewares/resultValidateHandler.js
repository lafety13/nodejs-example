const { validationResult } = require('express-validator/check');

module.exports = (validationRules = []) => {
    if (!Array.isArray(validationRules)) {
        throw new Error('Invalid argument type. Argument should be array.');
    }

    const fnResultHandler = (request, response, next) => {
        const validationErrors = validationResult(request);

        try {
            if (!validationErrors.isEmpty()) {
                validationErrors.throw();
            }
            next();
        } catch (e) {
            throw e;
        }
    };

    return [...validationRules, fnResultHandler];
};

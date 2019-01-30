const { validationResult } = require('express-validator/check');

module.exports = (err, req, res, next) => {
    if (!err) return next();

    let errorResponse = {};
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
        errorResponse = validationError.array() || {};
    }

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500).json(errorResponse);
};

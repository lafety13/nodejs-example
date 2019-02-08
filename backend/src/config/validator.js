const validator = require('express-validation');

exports.initSettings = () => {
    validator.options({
        status: 422,
        statusText: 'Unprocessable Entity'
    });
};

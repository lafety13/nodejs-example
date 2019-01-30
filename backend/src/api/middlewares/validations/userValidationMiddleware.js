const { param } = require('express-validator/check');

exports.getUserValidation = () => [
    param('id', 'Invalid id param').matches(/^[0-9a-fA-F]{24}$/)
];

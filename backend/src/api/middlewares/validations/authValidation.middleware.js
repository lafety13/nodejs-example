const { body } = require('express-validator/check');
const resultValidationHandler = require('../../middlewares/validations/resultValidateHandler.middleware');

exports.loginValidation = () => [
    body('email').exists().not().isEmpty(),
    body('password').exists().not().isEmpty(),
    resultValidationHandler
];

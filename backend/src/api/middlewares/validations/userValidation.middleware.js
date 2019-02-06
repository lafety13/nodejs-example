const { param, body } = require('express-validator/check');
const resultValidationHandler = require('../../middlewares/validations/resultValidateHandler.middleware');

exports.validationGetUserRequest = () => [
    param('id', 'Invalid id param').matches(/^[0-9a-fA-F]{24}$/)
];

exports.validationRegisterUser = () => [
    body('name', 'name is required').exists().not().isEmpty(),
    body('nickname', 'nickname is required').trim().not().isEmpty().exists(),
    body('email', 'email is required').exists(),
    body('email', 'Email is not valid').isEmail(),
    body('password', 'password is required').exists().not().isEmpty(),
    resultValidationHandler
];

const express = require('express');
const userController = require('../../controllers/user.controller');
const { validationGetUserRequest } = require('../../middlewares/validations/userValidation.middleware');
const resultValidationHandler = require('../../middlewares/resultValidateHandler.middleware');

const router = express.Router();

router.get('/:id', resultValidationHandler(validationGetUserRequest()), userController.getUserById);

module.exports = router;

const express = require('express');
const userController = require('../../controllers/user');
const { getUserValidation } = require('../../middlewares/validations/userValidationMiddleware');
const resultValidationHandler = require('../../middlewares/resultValidateHandler');

const router = express.Router();

router.get('/:id', resultValidationHandler(getUserValidation()), userController.getUserById);

module.exports = router;

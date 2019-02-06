const express = require('express');
const authController = require('../../controllers/auth.controller');
const { validationRegisterUser } = require('../../middlewares/validations/userValidation.middleware');
const router = express.Router();
const { loginValidation } = require('../../middlewares/validations/authValidation.middleware');

router.post('/register', validationRegisterUser(), authController.register);
router.post('/login', loginValidation(), authController.login);
router.post('/refresh', authController.refreshToken);
router.get('/logout', authController.logout);

module.exports = router;

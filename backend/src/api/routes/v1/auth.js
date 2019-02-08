const express = require('express');
const validate = require('express-validation');
const authController = require('../../controllers/auth.controller');
const authValidation = require('../../validations/auth.validation');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/refresh', validate(authValidation.refresh), authController.refreshToken);
router.get('/logout', authController.logout);

module.exports = router;

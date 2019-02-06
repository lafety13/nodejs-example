const express = require('express');
const passport = require('passport');

const userController = require('../../controllers/user.controller');
const { validationGetUserRequest } = require('../../middlewares/validations/userValidation.middleware');

const router = express.Router();

router.get(
    '/:id',
    passport.authenticate('bearer', { session: false }),
    validationGetUserRequest(),
    userController.getUserById
);

module.exports = router;

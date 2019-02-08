const express = require('express');
const passport = require('passport');

const userController = require('../../controllers/user.controller');

const router = express.Router();

router.get(
    '/:id',
    passport.authenticate('bearer', { session: false }),
    userController.getUserById
);

module.exports = router;

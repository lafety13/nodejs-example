const httpStatus = require('http-status');

const userService = require('../services/user.service');

exports.getUserById = (request, response, next) => {
    const id = request.params.id;

    userService.findUserById(id).then((user) => {
        const responseStatus = user ? httpStatus.OK : httpStatus.INTERNAL_SERVER_ERROR;
        response.status(responseStatus).json(user);
    }).catch((error) => {
        next(error);
    });
};

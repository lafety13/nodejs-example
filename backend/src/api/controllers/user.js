const httpStatus = require('http-status');

const userService = require('../services/user');

exports.getUserById = (request, response, next) => {
    const id = request.params['id'];

    userService.findUserById(id).then((user) => {
        let responseStatus = httpStatus.OK;
        if (!user) {
            responseStatus = httpStatus.NOT_FOUND;
        }
        response.status(responseStatus).json(user);
    }).catch((error) => {
        next(error);
    });
};

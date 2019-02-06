const httpStatus = require('http-status');

const userService = require('../services/user.service');

exports.getUserById = async (request, response, next) => {
    try {
        const id = request.params.id;
        const user = await userService.findUserById(id);
        const responseStatus = user ? httpStatus.OK : httpStatus.INTERNAL_SERVER_ERROR;

        response.status(responseStatus).json(user);
    } catch (error) {
        next(error);
    }
};

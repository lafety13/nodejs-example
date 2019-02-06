const httpStatus = require('http-status');
const authService = require('../services/auth.service');

exports.login = async (request, response, next) => {
    try {
        const body = request.body;
        const token = await authService.login(body);

        response.status(httpStatus.OK).json(token);
    } catch (error) {
        next(error);
    }
};

exports.logout = async (request, response, next) => {
    try {
        response.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }
};

exports.register = async (request, response, next) => {
    try {
        const userBody = request.body;
        const user = await authService.register(userBody);

        response.status(httpStatus.OK).json(user);
    } catch (error) {
        next(error);
    }
};

exports.refreshToken = async (request, response, next) => {
    try {
        const { refreshToken, userId } = request.body;
        const data = await authService.refresh(refreshToken, userId);

        response.status(httpStatus.OK).json(data);
    } catch (error) {
        next(error);
    }
};

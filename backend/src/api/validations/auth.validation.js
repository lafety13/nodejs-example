const Joi = require('joi');

module.exports = {
    login: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(36).required().label('asd'),
        }
    },
    register: {
        body: {
            name: Joi.string().required(),
            nickname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(36).required()
        }
    },
    refresh: {
        body: {
            refreshToken: Joi.string().required(),
            userId: Joi.string().required()
        }
    }
};

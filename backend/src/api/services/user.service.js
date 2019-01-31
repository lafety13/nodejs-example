const UserModel = require('../models/user.model');
const logger = require('../../config/logger');

exports.findUserById = async (id) => {
    try {
        return await UserModel.findById(id);
    } catch (e) {
        logger.error(e);
        throw e;
    }
};

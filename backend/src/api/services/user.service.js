const { UserModel } = require('../models/user.model');

exports.findUserById = async (id) => {
    return await UserModel.findOne({ _id: id });
};

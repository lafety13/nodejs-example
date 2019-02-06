const jsonwebtoken = require('jsonwebtoken');
const httpStatus = require('http-status');
const moment = require('moment-timezone');
const bcrypt = require('bcrypt');

const AuthError = require('../errors/AuthError');
const { tokenSecretKey, tokenExpirationInterval } = require('../../config/vars');
const { RefreshTokenModel } = require('../models/refreshToken.model');
const { UserModel } = require('../models/user.model');

const _generateToken = (user) => {
    const options = {
        expiresIn: moment().add(tokenExpirationInterval, 'minutes').unix()
    };

    return jsonwebtoken.sign({ userId: user.id }, tokenSecretKey, options);
};

const _buildRefreshTokenData = async (user) => {
    try {
        const [ newRefreshToken, refreshToken ] = await Promise.all([
            bcrypt.hash(user.id.toString(), Math.random()),
            RefreshTokenModel.findOne({ userId: user.id })
        ]);

        const tokenData = {
            expires: moment().add(30, 'days').unix(),
            token: newRefreshToken
        };

        let refreshTokenModel;
        if (refreshToken) {
            refreshTokenModel = await refreshToken
                .update(tokenData)
                .then(() => ({
                    ...refreshToken.toObject(),
                    ...tokenData
                }));
        } else {
            const model = new RefreshTokenModel({
                userId: user.id,
                userEmail: user.email,
                ...tokenData
            });
            refreshTokenModel = await model.save();
        }

        return refreshTokenModel;
    } catch (error) {
        throw error;
    }
};

const _handleTokenProcess = async (user) => {
    try {
        const tokenType = 'Bearer';
        const accessToken = await _generateToken(user);
        const { token } = await _buildRefreshTokenData(user);

        return { tokenType, accessToken, refreshToken: token, user };
    } catch (error) {
        throw error;
    }
};

exports.login = async (credentials) => {
    try {
        const user = await UserModel.findOne({ email: credentials.email });

        if (!user || !user.checkPassword(credentials.password)) {
            throw new AuthError({
                message: 'Password or/and email is invalid.',
                status: httpStatus.UNPROCESSABLE_ENTITY
            });
        }

        return await _handleTokenProcess(user);
    } catch (error) {
        throw error;
    }
};

exports.logout = async (userId) => {
    try {
        return await RefreshTokenModel.findOneAndDelete({ userId });
    } catch (error) {
        throw error;
    }
};

exports.register = async (userBody) => {
    try {
        const user = new UserModel(userBody);
        return await user.save();
    } catch (error) {
        throw error;
    }
};

exports.refresh = async (refreshToken, userId) => {
    try {
        const [ user, refreshModel ] = await Promise.all([
            UserModel.findOne({ _id: userId }),
            RefreshTokenModel.findOne({ userId })
        ]);

        if (!refreshModel && refreshModel.token !== refreshToken) {
            throw new AuthError({
                message: 'Invalid token',
                status: httpStatus.UNAUTHORIZED
            });
        }

        if (moment(refreshModel.expires).diff(moment(), 'seconds') < 0) {
            throw new AuthError({
                message: 'Refresh token is expired',
                status: httpStatus.UNAUTHORIZED
            });
        }

        return _handleTokenProcess(user);
    } catch (error) {
        throw error;
    }
};

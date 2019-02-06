const BearerStrategy = require('passport-http-bearer').Strategy;
const jsonwebtoken = require('jsonwebtoken');

const { UserModel } = require('../api/models/user.model');
const { tokenSecretKey } = require('../config/vars');

exports.bearerStrategy = new BearerStrategy(
    async function(token, done) {
        try {
            const { userId } = await jsonwebtoken.verify(token, tokenSecretKey);
            const user = await UserModel.findOne({ _id: userId });

            if (!user) {
                return done(null, false);
            }

            return done(null, user, { scope: 'read' });
        } catch (e) {
            done(null, false);
        }
    }
);

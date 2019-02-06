const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userEmail: {
        type: 'String',
        ref: 'User',
        required: true,
    },
    expires: { type: Date }
});

const refreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports.RefreshTokenModel = refreshTokenModel;

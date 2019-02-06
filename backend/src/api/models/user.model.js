const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { env } = require('../../config/vars');

const roles = ['user', 'admin'];

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type : String,
        unique : [true, 'hello'],
        required : true,
        dropDups: true,
        match: /^\S+@\S+\.\S+$/,
        trim: true
    },
    picture: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    role: {
        type: String,
        enum: roles,
        default: 'user'
    },
}, {
    timestamps: true
});

UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
};

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(this.password, password);
};

UserSchema.methods.findByName = async function(username) {
    return await this.find({ name: username });
};

UserSchema.virtual('id')
    .get(function() {
        return this._id;
    });

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();
        const rounds = env === 'test' ? 1 : 10;
        this.password = await bcrypt.hash(this.password, rounds);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        // TODO: handle validation error
        next(error);
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports.UserModel = User;
module.exports.UserSchema = UserSchema;

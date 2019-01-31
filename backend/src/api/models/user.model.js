const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true
    },
    lastName: String,
    nickname: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

UserSchema.methods.encryptPassword = (password, salt) => crypto.createHmac('sha1', salt).update(password).digest('hex');

UserSchema.methods.checkPassword = password => this.encryptPassword(password, this.salt) === this.password;

UserSchema.virtual('id').get(() => this._id);

UserSchema.pre('save', (next) => {
    this.salt = crypto.randomBytes(32).toString('base64');
    this.password = this.encryptPassword(this.password, this.salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);

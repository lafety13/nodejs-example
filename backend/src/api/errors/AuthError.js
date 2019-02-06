const BaseApiError = require('./BaseApiError');

class AuthError extends BaseApiError {
    constructor({ message, errors, status, stack }) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.status = status;
        this.stack = stack;
    }
}

module.exports = AuthError;

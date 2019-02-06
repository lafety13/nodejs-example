require('dotenv').config();
const fs = require('fs');

const fnGetSecretKey = () => {
    const path = __dirname + '/secret';
    if (!fs.existsSync(path)) {
        throw new Error('File with secret key is not exist');
    }

    return fs.readFileSync(path, 'utf8');
};

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    tokenExpirationInterval: process.env.TOKEN_EXPIRATION_MINUTES,
    mongo: {
        uri: process.env.NODE_ENV === 'test'
            ? process.env.MONGO_URI_TESTS
            : process.env.MONGO_URI,
    },
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    logDir: 'src/logs',
    tokenSecretKey: fnGetSecretKey()
};

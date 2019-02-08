const http = require('http');

const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const validation = require('./config/validator');

mongoose.connect();
validation.initSettings();

app.server = http.createServer(app).listen(port, () => {
    logger.info(`server started on port ${port} (${env})`);
});

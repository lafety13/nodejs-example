const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const expressValidator = require('express-validator');
const passport = require('passport');
const passportConfig = require('../config/passport');

const routes = require('../api/routes/v1');
const { logs } = require('./vars');
const errorHandlers = require('../api/middlewares/errorHandler.middleware');

const app = express();

app.use(morgan(logs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());
app.use(methodOverride());
app.use(helmet());
app.use(cors());
app.use(expressValidator());

app.use(passport.initialize());
passport.use(passportConfig.bearerStrategy);

app.use('/api/v1', routes);

app.use(errorHandlers.errorConverter);
app.use(errorHandlers.error404Handler);
app.use(errorHandlers.errorHandler);

module.exports = app;

// import required libraries
const express = require('express');
const logger = require('./logger');
const apiResponse = require('./common/ApiResponse');
const { APP_DB_PORT } = require('./settings/settings.config');

// create express app and port
const app = express();
const PORT = APP_DB_PORT || '3000';

// use express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database = mongoDB
const dbSetup = require('./providers/db');

dbSetup();

const routes = require('./providers/routes');

app.use(routes);

app.use((err, _req, res, _next) => {
  if (err) {
    return apiResponse.errorObject(res, err);
  }
  return apiResponse.errorObject(res, err, 404);
});

// listener setup
app.listen(PORT, () => {
  logger.info(`Server is running at ${PORT}...`);
});

// export app
module.exports = app;

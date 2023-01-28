// import required libraries
const express = require('express');
const logger = require('./logger');
const apiResponse = require('./common/ApiResponse');
const { PORT } = require('./settings/settings.config');

// create express app and port
const app = express();
const port = PORT || '3000';

// use express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const routes = require('./providers/routes');

app.use(routes);

app.use((err, _req, res, _next) => {
  if (err) {
    return apiResponse.errorObject(res, err);
  }
  return apiResponse.errorObject(res, err, 404);
});

// listener setup
app.listen(port, () => {
  logger.info(`Server is running at port ${port}...`);
});

// export app
module.exports = app;

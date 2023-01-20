// import required modules
const logger = require('../logger');
const ApplicationException = require('./ApplicationException');

function send(res, code, status, message, data) {
  const responseData = {
    message,
    status,
    data,
  };
  return res.status(code).json(responseData);
}

// declare api response class
class ApiResponse {
  constructor() {
    this.send = send.bind(this);
  }

  // success response
  success(res, message, data, code) {
    return this.send(res, code || 200, 'success', message, data);
  }

  // error response
  error(res, message, data, code) {
    return this.send(res, code || 500, 'error', message, data);
  }

  // error response
  errorObject(res, error, code, meta) {
    let message;
    let theCode;

    if (error instanceof ApplicationException) {
      message = error.message;
      theCode = error.code;
    } else if (code === 404) {
      message = 'Not found';
    } else {
      logger.error(error.message, { ...error, meta });
      message = 'Unexpected error occurred while processing your request';
      theCode = 500;
    }

    return this.send(res, theCode, 'error', message);
  }
}

const apiResponse = new ApiResponse();

// export
module.exports = apiResponse;

// import required libraries
const mongoose = require('mongoose');
const logger = require('../../logger/index');
const config = require('../../settings/settings.config');

// dbSetup module
const dbSetup = async () => {
  try {
    const db = config.APP_DB;
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.set('strictQuery', false);

    await mongoose.connect(db, connectionParams);

    logger.info('Connection to database has been established successfully');
  } catch (error) {
    const meta = 'database';

    logger.error(`Unable to connect to the database: ${error.message}`, {
      ...error,
      meta,
    });
  }
};

// export dbSetup module
module.exports = dbSetup;

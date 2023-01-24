// import required modules
const apiResponse = require('../../common/ApiResponse');

const {
  ruleValidation,
} = require('../validations/ruleValidationSchema');

// is rule values validated
const isValidForRule = async (req, res, next) => {
  // validate user-imputed values
  const validForRule = await ruleValidation.validate(req.body);

  // check if user-imputed values had errors
  if (validForRule.error) {
    apiResponse.error(res, validForRule.error?.message);
  } else {
    next();
  }
};

// export
module.exports = {
  isValidForRule,
};

// import required modules
const apiResponse = require('../../common/ApiResponse');
const ruleValidationService = require('../services/ruleValidation.service');

// validate rule controller
const ruleValidationCtrl = async (req, res) => {
  try {
    const { rule, data } = req.body;

    // validate rule service
    const ruleValidation = await ruleValidationService(rule, data);

    if (ruleValidation.validation.error) {
      return apiResponse.error(res, `field ${rule.field} failed validation.`, ruleValidation ?? null, 400);
    }
    return apiResponse.success(res, `field ${rule.field} successfully validated.`, ruleValidation, 200);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'validate-rule');
  }
};

// export controller
module.exports = ruleValidationCtrl;

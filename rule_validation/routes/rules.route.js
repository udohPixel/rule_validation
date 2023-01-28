// import required libraries
const express = require('express');

// import required middlewares
const {
  isValidForRule,
} = require('../middlewares/validForRule');

// import required controllers
const getMyInformationCtrl = require('../controllers/getMyInformation.controller');
const ruleValidationCtrl = require('../controllers/ruleValidation.controller');

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for fetching my information
 * @api     - /
 * @access  - PUBLIC
 * @type    - GET
 */
router.get('/', getMyInformationCtrl);

/**
 * @desc    - route for adding new rule validation
 * @api     - /validate-rule
 * @access  - PUBLIC
 * @type    - POST
 */
router.post('/validate-rule', isValidForRule, ruleValidationCtrl);

// export router
module.exports = router;

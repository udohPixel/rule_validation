// import required libraries
const express = require('express');

// import required controllers
const getMyInformationCtrl = require('../controllers/getMyInformation.controller');

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

// export router
module.exports = router;

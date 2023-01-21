// import required libraries
const express = require('express');

// import required routes
const ruleValidation = require('../../rule-validation/routes/rules.route');

// create express router
const router = express.Router();

// api routes setup
router.use('/', ruleValidation);

module.exports = router;

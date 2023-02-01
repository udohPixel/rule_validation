// import required modules
const ApplicationException = require('../../common/ApplicationException');
const { evaluateRule } = require('../helpers/ruleEvaluator');

// validate rule service
const ruleValidationService = async (rule, data) => {
  const splitedField = rule.field.split('.');

  // check if number of dots in rule.field is greater than one
  if (splitedField.length > 2) {
    throw new ApplicationException('field nesting should not be more than two levels.');
  }

  // check if the field in the rule object is missing in data and no dots
  if (!data[rule.field] && (splitedField.length === 1)) {
    throw new ApplicationException(`field ${rule.field} is missing from data.`);
  }

  // check if the field in the rule object is missing in data and number of dots is 1
  if (!data[splitedField[0]][splitedField[1]] && (splitedField.length === 2)) {
    throw new ApplicationException(`field ${rule.field} is missing from data.`);
  }

  const fieldValue = ((splitedField.length - 1) < 1)
    ? data[rule.field] : data[splitedField[0]][splitedField[1]];
  const { condition, condition_value: conditionValue } = rule;

  // evaluate rule
  const ruleEvaluator = evaluateRule(condition, fieldValue, conditionValue);

  const ruleValidation = {
    validation: {
      error: !ruleEvaluator,
      field: rule.field,
      field_value: fieldValue,
      condition,
      condition_value: conditionValue,
    },
  };

  return ruleValidation;
};

// export service
module.exports = ruleValidationService;

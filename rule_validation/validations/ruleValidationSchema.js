// import require modules
const Joi = require('joi');
const validatorConfig = require('../../settings/validator.config');

// rule validation req schema
const ruleValidationReqSchema = {
  ruleValidation: Joi.object({
    rule: Joi.object({
      field: Joi.string().required().messages({
        'any.required': 'field is required.',
        'string.base': 'field should be a string.',
        'string.empty': 'field should not be empty.',
      }),
      condition: Joi.string()
        .valid(...validatorConfig.CONDITION_ARRAY).required()
        .messages({
          'any.required': 'condition is required.',
          'any.only': 'condition should be eq, neq, gt, gte or contains.',
        }),
      condition_value:
        Joi.alternatives()
          .try(Joi.object(), Joi.array(), Joi.string(), Joi.number(), Joi.boolean()).required()
          .messages({
            'any.required': 'condition_value is required.',
            'alternatives.types': 'data should be an object, array, string, number or boolean.',
            'string.empty': 'condition_value should not be empty.',
          }),
    }).required().messages({
      'any.required': 'rule is required.',
      'object.base': 'rule should be an object.',
    }),
    data:
      Joi.alternatives().try(Joi.object(), Joi.array(), Joi.string()).required()
        .messages({
          'any.required': 'data is required.',
          'alternatives.types': 'data should be an object, array or string.',
          'string.empty': 'data should not be empty.',
        }),
  }),
};

// export schema
module.exports = ruleValidationReqSchema;

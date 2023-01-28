// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
const validationData = require('./ruleValidation.data.mock.json');

const ruleValidationService = require('../rule_validation/services/ruleValidation.service');

// rule validation unit test
describe('RULE VALIDATION UNIT TEST', () => {
  const inputDataGte = { ...validationData.bodyData.successGte };
  const inputDataContains = { ...validationData.bodyData.successContains };

  const stubSuccessGte = {
    validation: {
      error: false,
      field: 'missions.count',
      field_value: 45,
      condition: 'gte',
      condition_value: 30,
    },
  };
  const stubSuccessContains = {
    validation: {
      error: false,
      field: '2',
      field_value: 'The Roci',
      condition: 'contains',
      condition_value: 'Roci',
    },
  };

  it('should validate rule successfully using the gte condition.', async () => {
    const response = await ruleValidationService(inputDataGte.rule, inputDataGte.data);

    expect(response).to.be.an('object');
    expect(response.validation).to.be.an('object');
    expect(response.validation).to.have.property('error', stubSuccessGte.validation.error);
    expect(response.validation).to.have.property('field', stubSuccessGte.validation.field);
    expect(response.validation).to.have.property('field_value', stubSuccessGte.validation.field_value);
    expect(response.validation).to.have.property('condition', stubSuccessGte.validation.condition);
    expect(response.validation).to.have.property('condition_value', stubSuccessGte.validation.condition_value);
  });

  it('should validate rule successfully using the contains condition.', async () => {
    const response = await ruleValidationService(inputDataContains.rule, inputDataContains.data);

    expect(response).to.be.an('object');
    expect(response.validation).to.be.an('object');
    expect(response.validation).to.have.property('error', stubSuccessContains.validation.error);
    expect(response.validation).to.have.property('field', stubSuccessContains.validation.field);
    expect(response.validation).to.have.property('field_value', stubSuccessContains.validation.field_value);
    expect(response.validation).to.have.property('condition', stubSuccessContains.validation.condition);
    expect(response.validation).to.have.property('condition_value', stubSuccessContains.validation.condition_value);
  });
});

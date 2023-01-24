// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
const validationData = require('./ruleValidation.data.mock.json');

const ruleValidationCtrl = require('../rule_validation/controllers/ruleValidation.controller');

// rule validation e2e test
describe('RULE VALIDATION E2E TEST', () => {
  describe('POSITIVE TEST', () => {
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

    let status; let json; let res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    it('should validate rule successfully using the gte condition.', async () => {
      const req = {
        body: inputDataGte,
      };

      await ruleValidationCtrl(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].status).to.equal('success');
      expect(json.args[0][0].message).to.equal(`field ${inputDataGte.rule.field} successfully validated.`);
      expect(json.args[0][0].data.validation).to.contain(stubSuccessGte.validation);
    });

    it('should validate rule successfully using the contains condition.', async () => {
      const req = {
        body: inputDataContains,
      };

      await ruleValidationCtrl(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].status).to.equal('success');
      expect(json.args[0][0].message).to.equal(`field ${inputDataContains.rule.field} successfully validated.`);
      expect(json.args[0][0].data.validation).to.contain(stubSuccessContains.validation);
    });
  });

  describe('NEGATIVE TEST', () => {
    const inputDataFailEq = { ...validationData.bodyData.failEq };
    const inputDataFailGt = { ...validationData.bodyData.failGt };
    const inputDataFailNeq = { ...validationData.bodyData.failNeq };
    const inputDataNesting = { ...validationData.bodyData.nestingError };
    const inputDataMissingOneLevel = { ...validationData.bodyData.missingOneLevelError };
    const inputDataMissingTwoLevels = { ...validationData.bodyData.missingTwoLevelsError };

    const stubFailEq = {
      validation: {
        error: true,
        field: '0',
        field_value: 'd',
        condition: 'eq',
        condition_value: 'a',
      },
    };
    const stubFailGt = {
      validation: {
        error: true,
        field: 'missions',
        field_value: 12,
        condition: 'gt',
        condition_value: 30,
      },
    };
    const stubFailNeq = {
      validation: {
        error: true,
        field: 'missions.count',
        field_value: 30,
        condition: 'neq',
        condition_value: 30,
      },
    };
    const stubNull = null;

    let status; let json; let res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    it('should not validate rule successfully when rule validation fails using the eq condition.', async () => {
      const req = {
        body: inputDataFailEq,
      };

      await ruleValidationCtrl(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].status).to.equal('error');
      expect(json.args[0][0].message).to.equal(`field ${inputDataFailEq.rule.field} failed validation.`);
      expect(json.args[0][0].data.validation).to.contain(stubFailEq.validation);
    });

    it('should not validate rule successfully when rule validation fails using the gt condition.', async () => {
      const req = {
        body: inputDataFailGt,
      };

      await ruleValidationCtrl(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].status).to.equal('error');
      expect(json.args[0][0].message).to.equal(`field ${inputDataFailGt.rule.field} failed validation.`);
      expect(json.args[0][0].data.validation).to.contain(stubFailGt.validation);
    });

    it('should not validate rule successfully when rule validation fails using the neq condition.', async () => {
      const req = {
        body: inputDataFailNeq,
      };

      await ruleValidationCtrl(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].status).to.equal('error');
      expect(json.args[0][0].message).to.equal(`field ${inputDataFailNeq.rule.field} failed validation.`);
      expect(json.args[0][0].data.validation).to.contain(stubFailNeq.validation);
    });

    it('should not validate rule successfully when the field nesting is more than two levels.', async () => {
      const req = {
        body: inputDataNesting,
      };

      await ruleValidationCtrl(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].status).to.equal('error');
      expect(json.args[0][0].message).to.equal('field nesting should not be more than two levels.');
      expect(json.args[0][0].data).to.equal(stubNull);
    });

    it('should not validate rule successfully when the field specified in the rule object is missing from the data passed and has one level.', async () => {
      const req = {
        body: inputDataMissingOneLevel,
      };

      await ruleValidationCtrl(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].status).to.equal('error');
      expect(json.args[0][0].message).to.equal(`field ${inputDataMissingOneLevel.rule.field} is missing from data.`);
      expect(json.args[0][0].data).to.equal(stubNull);
    });

    it('should not validate rule successfully when the field specified in the rule object is missing from the data passed and has two levels.', async () => {
      const req = {
        body: inputDataMissingTwoLevels,
      };

      await ruleValidationCtrl(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].status).to.equal('error');
      expect(json.args[0][0].message).to.equal(`field ${inputDataMissingTwoLevels.rule.field} is missing from data.`);
      expect(json.args[0][0].data).to.equal(stubNull);
    });
  });
});

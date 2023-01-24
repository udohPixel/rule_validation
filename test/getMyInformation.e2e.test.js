// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
const myInformationData = require('./getMyInformation.data.mock.json');
const getMyInformationCtrl = require('../rule_validation/controllers/getMyInformation.controller');

// get my information e2e test
describe('GET MY INFORMATION E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const returnData = { ...myInformationData.returnData.valid };

    let status; let json; let res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    it('should return my information successfully.', async () => {
      const req = {};

      await getMyInformationCtrl(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].status).to.equal('success');
      expect(json.args[0][0].message).to.equal('My Rule-Validation API');
      expect(json.args[0][0].data).to.contain(returnData);
    });
  });
});

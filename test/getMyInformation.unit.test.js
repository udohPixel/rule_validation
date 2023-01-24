// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
const myInformationData = require('./getMyInformation.data.mock.json');
const getMyInformationService = require('../rule_validation/services/getMyInformation.service');

// get my information unit test
describe('GET MY INFORMATION UNIT TEST', () => {
  const returnData = { ...myInformationData.returnData.valid };

  it('should return my information successfully.', () => {
    const response = getMyInformationService();

    expect(response).to.be.an('object');
    expect(response).to.be.an('object').that.is.not.empty;
    expect(response).to.have.property('name', returnData.name);
    expect(response).to.have.property('github', returnData.github);
    expect(response).to.have.property('email', returnData.email);
    expect(response).to.have.property('mobile', returnData.mobile);
    expect(response).to.have.property('twitter', returnData.twitter);
  });
});

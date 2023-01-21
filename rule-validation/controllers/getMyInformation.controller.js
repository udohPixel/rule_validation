// import required modules
const apiResponse = require('../../common/ApiResponse');
const getMyInformationService = require('../services/getMyInformation.service');

// get all categories controller
const getMyInformationCtrl = async (req, res) => {
  try {
    // get all categories service
    const myInformation = await getMyInformationService();

    return apiResponse.success(res, 'My Rule-Validation API', myInformation);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'get-my-information');
  }
};

// export controller
module.exports = getMyInformationCtrl;

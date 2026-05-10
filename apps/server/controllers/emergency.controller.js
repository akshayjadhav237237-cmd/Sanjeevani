// emergency.controller.js
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

// Placeholder for emergency endpoints
exports.placeholder = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, null, 'emergency endpoint hit successfully');
});

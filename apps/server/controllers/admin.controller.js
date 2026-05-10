// admin.controller.js
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

// Placeholder for admin endpoints
exports.placeholder = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, null, 'admin endpoint hit successfully');
});

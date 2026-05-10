const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return ApiResponse.error(res, 'Not authorized to access this route', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Patient.findById(decoded.id).select('-password');

        if (!req.user) {
            return ApiResponse.error(res, 'User not found', 401);
        }

        next();
    } catch (error) {
        return ApiResponse.error(res, 'Not authorized, token failed', 401);
    }
});

module.exports = { protect };

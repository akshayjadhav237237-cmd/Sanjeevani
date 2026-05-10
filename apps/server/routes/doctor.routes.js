const express = require('express');
const router = express.Router();
const controller = require('../controllers/doctor.controller');

// Add actual routes here later
router.get('/', controller.placeholder);

module.exports = router;

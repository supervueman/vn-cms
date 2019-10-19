const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByApiKey = require('../../../middleware/profileByApiKey');

router.get('/', profileByApiKey, controller.findAll);

module.exports = router;

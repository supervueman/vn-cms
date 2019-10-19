const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByApiKey = require('../../../../middleware/profileByApiKey');

router.post('/', profileByApiKey, controller.send);

module.exports = router;

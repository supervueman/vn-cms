const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../../../middleware/profileByAccessToken');

router.get('/findone', profileByAccessToken, controller.findOne);

router.post('/update', profileByAccessToken, controller.update);

module.exports = router;

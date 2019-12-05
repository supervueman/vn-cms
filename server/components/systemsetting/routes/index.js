const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Common middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');

router.get('/', profileByAccessToken, controller.findAll);

router.get('/findone', profileByAccessToken, controller.findOne)

router.put('/update', profileByAccessToken, controller.update);

router.get('/count', profileByAccessToken, controller.count);

module.exports = router;

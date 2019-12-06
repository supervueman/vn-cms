const express = require('express');

const controller = require('../controller');

const router = express.Router();

const profileByApiKey = require('../../../middleware/profileByApiKey');

router.post('/registration', profileByApiKey, controller.registration);

module.exports = router;

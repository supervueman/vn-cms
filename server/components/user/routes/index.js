const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByApiKey = require('../../../middleware/profileByApiKey');
const profileByAccessToken = require('../../../middleware/profileByAccessToken');

router.get('/', profileByApiKey, controller.findAll);

router.get('/find/:id', profileByApiKey, controller.findByPk);

router.get('/findone', profileByApiKey, controller.findOne);

router.put('/update', profileByAccessToken, controller.update);

router.put('/password-change', profileByAccessToken, controller.changePassword);

router.delete('/remove', profileByAccessToken, controller.remove);

router.get('/count', profileByApiKey, controller.count);

module.exports = router;

const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../../../middleware/profileByAccessToken');
const profileByApiKey = require('../../../../../middleware/profileByapiKey');

router.get('/', profileByApiKey, controller.findAll);

router.get('/find/:id', profileByAccessToken, controller.findByPk);

router.get('/findone', profileByAccessToken, controller.findOne);

router.post('/create', profileByAccessToken, controller.create);

router.put('/update', profileByAccessToken, controller.update);

router.delete('/remove', profileByAccessToken, controller.remove);

router.get('/count', profileByApiKey, controller.count);

module.exports = router;

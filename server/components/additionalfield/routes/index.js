const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');
const profileByApiKey = require('../../../middleware/profileByApiKey');

router.get('/', profileByApiKey, controller.findAll);

router.get('/find/:id', profileByApiKey, controller.findByPk);

router.get('/findone', profileByApiKey, controller.findOne);

router.post('/create', profileByAccessToken, controller.create);

router.put('/update', profileByAccessToken, controller.update);

router.put('/update-all', profileByAccessToken, controller.updateAll);

router.delete('/remove', profileByAccessToken, controller.remove);

module.exports = router;

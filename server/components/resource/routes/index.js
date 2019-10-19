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

router.get('/types', profileByApiKey, controller.findTypes);

router.post('/create', profileByAccessToken, controller.create);

router.put('/update', profileByAccessToken, controller.update);

router.delete('/remove', profileByAccessToken, controller.remove);

router.get('/count', profileByApiKey, controller.count);

router.put('/add-translation', profileByAccessToken, controller.addTranslation);

module.exports = router;

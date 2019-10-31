const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');

router.get('/', profileByAccessToken, controller.findAll);

router.get('/find/:id', profileByAccessToken, controller.findByPk);

router.get('/findone', profileByAccessToken, controller.findOne);

router.get('/finddefault', profileByAccessToken, controller.findDefault);

router.post('/create', profileByAccessToken, controller.create);

router.put('/update', profileByAccessToken, controller.update);

router.delete('/remove', profileByAccessToken, controller.remove);

router.get('/count', profileByAccessToken, controller.count);

module.exports = router;

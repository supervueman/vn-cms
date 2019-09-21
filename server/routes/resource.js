const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/resource');

// Middleware
const profileByAccessToken = require('../middleware/profileByAccessToken');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByApiKey, controller.findAll);

router.get('/resource/:id', profileByApiKey, controller.findByPk);

router.get('/resource/findOne', profileByApiKey, controller.findOne);

router.post('/create', profileByAccessToken, controller.create);

router.put('/update', profileByAccessToken, controller.update);

router.delete('/remove', profileByAccessToken, controller.remove);

router.get('/count', profileByApiKey, controller.count);

module.exports = router;

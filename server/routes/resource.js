const express = require('express');
const router = express.Router();

// Controllers
const resourceController = require('../controllers/resource');

// Middleware
const profileByAccessToken = require('../middleware/profileByAccessToken');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByApiKey, resourceController.findAll);

router.get('/resource/:id', profileByApiKey, resourceController.findByPk);

router.get('/resource/findOne', profileByApiKey, resourceController.findOne);

router.post('/create', profileByAccessToken, resourceController.create);

router.put('/update', profileByAccessToken, resourceController.update);

router.delete('/remove', profileByAccessToken, resourceController.remove);

router.get('/count', profileByApiKey, resourceController.count);

module.exports = router;

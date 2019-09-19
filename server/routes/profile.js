const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/profile');

// Middleware
const profileByAccessToken = require('../middleware/profileByAccessToken');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByAccessToken, controller.findByAccessToken);

router.post('/create', profileByApiKey, controller.create);

router.put('/update', profileByAccessToken, controller.update);

router.put('/password-change', profileByAccessToken, controller.changePassword);

router.delete('/remove', profileByAccessToken, controller.remove);

module.exports = router;

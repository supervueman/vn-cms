const express = require('express');
const router = express.Router();

// Controllers
const profileController = require('../controllers/profile');

// Middleware
const access = require('../middleware/access');
const profileByAccessToken = require('../middleware/profileByAccessToken');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByAccessToken, profileController.findByAccessToken);

router.post('/create', profileByApiKey, profileController.create);

router.put('/update', profileByAccessToken, profileController.update);

router.delete('/remove', profileByAccessToken, profileController.remove);

module.exports = router;

const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');
const profileByApiKey = require('../../../middleware/profileByApiKey');

router.get('/', profileByAccessToken, controller.findByAccessToken);

router.post('/create-by-email', profileByApiKey, controller.createByEmail);

router.put('/update', profileByAccessToken, controller.update);

router.put('/password-change', profileByAccessToken, controller.changePassword);

router.post('/password-reset-by-email-request', profileByAccessToken, controller.resetPasswordByEmailRequest);

router.post('/password-reset-by-email', profileByAccessToken, controller.resetPasswordByEmail);

router.delete('/remove', profileByAccessToken, controller.remove);

module.exports = router;

const express = require('express');

const controller = require('../controller');

const router = express.Router();

router.post('/login-by-email', controller.loginByEmail);

router.post('/login-by-phone', controller.loginByPhone);

module.exports = router;

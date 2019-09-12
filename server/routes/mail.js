const express = require('express');
const router = express.Router();

// Controllers
const mailController = require('../controllers/mail');

// Middleware
const profileByApiKey = require('../middleware/profileByApiKey');

router.post('/', profileByApiKey, mailController.send);

module.exports = router;

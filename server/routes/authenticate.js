const express = require('express');

const controller = require('../controllers/authenticate');

const router = express.Router();

router.post('/login', controller.login);

module.exports = router;

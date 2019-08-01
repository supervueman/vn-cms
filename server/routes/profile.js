const express = require('express');

const profileController = require('../controllers/profile');

const router = express.Router();

router.post('/create', profileController.create);

module.exports = router;

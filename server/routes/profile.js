const express = require('express');
const router = express.Router();

// Controllers
const profileController = require('../controllers/profile');

// Middleware
const access = require('../middleware/access');

router.post('/create', access, profileController.create);

router.get('/fetch', access, profileController.fetch);

router.put('/update', profileController.update);

module.exports = router;

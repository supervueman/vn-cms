const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/systemSetting');

// Middleware
const access = require('../middleware/access');

router.get('/', access, controller.findAll);

router.put('/update', access, controller.update);

router.get('/count', access, controller.count);

module.exports = router;

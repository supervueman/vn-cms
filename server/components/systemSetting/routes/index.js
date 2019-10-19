const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Common middleware
const access = require('../../../middleware/access');

router.get('/', access, controller.findAll);

router.get('/findone', access, controller.findOne)

router.put('/update', access, controller.update);

router.get('/count', access, controller.count);

module.exports = router;

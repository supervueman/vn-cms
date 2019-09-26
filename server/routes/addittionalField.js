const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/additionalField');

// Middleware
const access = require('../middleware/access');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByApiKey, controller.findAll);

router.get('/additionalfield/:id', profileByApiKey, controller.findByPk);

router.get('/findOne', profileByApiKey, controller.findOne);

router.post('/create', access, controller.create);

router.put('/update', access, controller.update);

router.put('/update-all', access, controller.updateAll);

router.delete('/remove', access, controller.remove);

module.exports = router;

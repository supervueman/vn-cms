const express = require('express');
const router = express.Router();

// Controllers
const additionalFieldController = require('../controllers/additionalField');

// Middleware
const access = require('../middleware/access');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByApiKey, additionalFieldController.findAll);

router.get('/additionalfield/:id', profileByApiKey, additionalFieldController.findByPk);

router.get('/additionalfield/findOne', profileByApiKey, additionalFieldController.findOne);

router.post('/create', access, additionalFieldController.create);

router.put('/update', access, additionalFieldController.update);

router.put('/update-all', access, additionalFieldController.updateAll);

router.delete('/remove', access, additionalFieldController.remove);

module.exports = router;

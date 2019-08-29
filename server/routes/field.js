const express = require('express');
const router = express.Router();

// Controllers
const fieldController = require('../controllers/field');

// Middleware
const access = require('../middleware/access');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByApiKey, fieldController.findAll);

router.get('/field/:id', profileByApiKey, fieldController.findByPk);

router.get('/field/findOne', profileByApiKey, fieldController.findOne);

router.post('/create', access, fieldController.create);

router.put('/update', access, fieldController.update);

router.delete('/remove', access, fieldController.remove);

router.get('/count', profileByApiKey, fieldController.count);

module.exports = router;

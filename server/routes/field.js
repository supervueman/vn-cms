const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/field');

// Middleware
const access = require('../middleware/access');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByApiKey, controller.findAll);

router.get('/find/:id', profileByApiKey, controller.findByPk);

router.get('/findone', profileByApiKey, controller.findOne);

router.post('/create', access, controller.create);

router.put('/update', access, controller.update);

router.delete('/remove', access, controller.remove);

router.get('/count', profileByApiKey, controller.count);

router.put('/add-layout', access, controller.addLayout);

router.put('/remove-layout', access, controller.removeLayout);

module.exports = router;

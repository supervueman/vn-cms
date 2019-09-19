const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/role');

// Middleware
const access = require('../middleware/access');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByApiKey, controller.findAll);

router.get('/role/:id', controller.findByPk);

router.get('/findone', controller.findOne);

router.post('/create', access, controller.create);

router.put('/update', access, controller.update);

router.delete('/remove', access, controller.remove);

router.get('/count', profileByApiKey, controller.count);

module.exports = router;

const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/user');

// Middleware
const access = require('../middleware/access');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByApiKey, controller.findAll);

router.get('/user/:id', profileByApiKey, controller.findByPk);

router.get('/findone', profileByApiKey, controller.findone);

router.put('/update', access, controller.update);

router.put('/password-change', access, controller.changePassword);

router.delete('/remove', access, controller.remove);

router.get('/count', profileByApiKey, controller.count);

module.exports = router;

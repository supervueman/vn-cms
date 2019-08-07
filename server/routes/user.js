const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/user');

// Middleware
const access = require('../middleware/access');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByApiKey, userController.findAll);

router.get('/user/:id', profileByApiKey, userController.findByPk);

router.get('/findone', profileByApiKey, userController.findone);

router.put('/update', access, userController.update);

router.put('/password-change', access, userController.changePassword);

router.delete('/remove', access, userController.remove);

module.exports = router;

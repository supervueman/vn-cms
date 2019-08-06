const express = require('express');
const router = express.Router();

// Controllers
const roleController = require('../controllers/role');

// Middleware
const access = require('../middleware/access');
const profileByApiKey = require('../middleware/profileByApiKey');

router.get('/', profileByApiKey, roleController.findAll);

router.get('/role/:id', profileByApiKey, roleController.findByPk);

router.get('/findone', profileByApiKey, roleController.findOne);

router.post('/create', access, roleController.create);

router.put('/update', access, roleController.update);

router.delete('/remove', access, roleController.remove);

module.exports = router;

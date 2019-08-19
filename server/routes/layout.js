const express = require('express');
const router = express.Router();

// Controllers
const layoutController = require('../controllers/layout');

// Middleware
const access = require('../middleware/access');
const profileByAccessToken = require('../middleware/profileByAccessToken');

router.get('/', access, layoutController.findAll);

router.get('/layout/:id', access, layoutController.findByPk);

router.get('/layout/findOne', access, layoutController.findOne);

router.post('/create', access, layoutController.create);

router.put('/update', access, layoutController.update);

router.delete('/remove', access, layoutController.remove);

module.exports = router;

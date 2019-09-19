const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/layout');

// Middleware
const access = require('../middleware/access');

router.get('/', access, controller.findAll);

router.get('/layout/:id', access, controller.findByPk);

router.get('/layout/findOne', access, controller.findOne);

router.post('/create', access, controller.create);

router.put('/update', access, controller.update);

router.delete('/remove', access, controller.remove);

router.get('/count', access, controller.count);

module.exports = router;

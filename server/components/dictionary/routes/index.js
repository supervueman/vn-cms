const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const access = require('../../../middleware/access');

router.get('/', controller.findAll);

router.get('/find/:id', controller.findByPk);

router.get('/findone', controller.findOne);

router.post('/create', access, controller.create);

router.put('/update', access, controller.update);

router.delete('/remove', access, controller.remove);

router.get('/count', controller.count);

module.exports = router;

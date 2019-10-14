const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/field');

// Middleware
const access = require('../middleware/access');

router.get('/', access, controller.findAll);

router.get('/find/:id', access, controller.findByPk);

router.get('/findone', access, controller.findOne);

router.post('/create', access, controller.create);

router.put('/update', access, controller.update);

router.delete('/remove', access, controller.remove);

router.get('/count', access, controller.count);

router.put('/add-layout', access, controller.addLayout);

router.put('/remove-layout', access, controller.removeLayout);

module.exports = router;

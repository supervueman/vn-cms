const express = require('express');
const router = express.Router();

// Controllers
const roleController = require('../controllers/role');

// Middleware
const access = require('../middleware/access');

router.get('/', access, roleController.findAll);

router.get('/role/:id', roleController.findByPk);

router.get('/findone', roleController.findOne);

router.post('/create', access, roleController.create);

router.put('/update', access, roleController.update);

router.delete('/remove', access, roleController.remove);

module.exports = router;

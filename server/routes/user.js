const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/queryAll', userController.queryAll);

module.exports = router;

const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');

router.get('/find-layout', profileByAccessToken, controller.findLayout);

router.post('/save-layout', profileByAccessToken, controller.saveLayout);

router.get('/find-components', profileByAccessToken, controller.findComponents);

router.get('/find-component', profileByAccessToken, controller.findComponent);

router.post('/save-component', profileByAccessToken, controller.saveComponent);

router.delete('/remove-component', profileByAccessToken, controller.removeComponent);

router.get('/find-pages', profileByAccessToken, controller.findPages);

router.get('/find-page', profileByAccessToken, controller.findPage);

router.post('/save-page', profileByAccessToken, controller.savePage);

router.delete('/remove-page', profileByAccessToken, controller.removePage);

module.exports = router;

const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/filesystem');

// Middleware
const profileByAccessToken = require('../middleware/profileByAccessToken');
const upload = require('../middleware/uploadFiles');

router.get('/', profileByAccessToken, controller.getFilesystem);

router.post('/create-dir', profileByAccessToken, controller.createDir);

router.post('/upload', profileByAccessToken, upload.array('file'), controller.upload);

router.put('/rename-dir', profileByAccessToken, controller.renameDir);

router.put('/rename-file', profileByAccessToken, controller.renameFile);

router.delete('/remove-dir', profileByAccessToken, controller.removeDir);

router.delete('/remove-file', profileByAccessToken, controller.removeFile);

module.exports = router;

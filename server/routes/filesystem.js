const express = require('express');
const router = express.Router();

// Controllers
const filesystemController = require('../controllers/filesystem');

// Middleware
const profileByAccessToken = require('../middleware/profileByAccessToken');
const upload = require('../middleware/uploadFiles');

router.get('/', profileByAccessToken, filesystemController.getFilesystem);

router.post('/create-dir', profileByAccessToken, filesystemController.createDir);

router.post('/upload', profileByAccessToken, upload.array('file'), filesystemController.upload);

router.put('/rename-dir', profileByAccessToken, filesystemController.renameDir);

router.put('/rename-file', profileByAccessToken, filesystemController.renameFile);

router.delete('/remove-dir', profileByAccessToken, filesystemController.removeDir);

router.delete('/remove-file', profileByAccessToken, filesystemController.removeFile);

module.exports = router;

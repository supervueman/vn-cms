const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../../middleware/profileByAccessToken');
const upload = require('../../../../middleware/uploadFiles');

/**
 * @swagger
 * tags:
 *   name: Filesystem
 *   description: Filesystem management
 */

/**
 * @swagger
 * path:
 *  /filesystem:
 *    get:
 *      summary: Get filesystem
 *      tags: [Filesystem]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Object filesystem
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.getFilesystem);

/**
 * @swagger
 * path:
 *  /filesystem/create:
 *    post:
 *      summary: Create directory
 *      tags: [Filesystem]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                path:
 *                  type: string
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.post('/create-dir', profileByAccessToken, controller.createDir);

router.post('/upload', profileByAccessToken, upload.array('file'), controller.upload);

router.put('/rename-dir', profileByAccessToken, controller.renameDir);

router.put('/rename-file', profileByAccessToken, controller.renameFile);

/**
 * @swagger
 * path:
 *  /filesystem/remove-dir:
 *    delete:
 *      summary: Delete directory
 *      tags: [Filesystem]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                path:
 *                  type: string
 *      responses:
 *        "204":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.delete('/remove-dir', profileByAccessToken, controller.removeDir);

/**
 * @swagger
 * path:
 *  /filesystem/remove-file:
 *    delete:
 *      summary: Delete file
 *      tags: [Filesystem]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                path:
 *                  type: string
 *      responses:
 *        "204":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.delete('/remove-file', profileByAccessToken, controller.removeFile);

module.exports = router;

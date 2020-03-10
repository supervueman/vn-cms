const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByApiKey = require('../../../../middleware/profileByApiKey');

/**
 * @swagger
 * tags:
 *   name: Mail
 *   description: Mail management
 */

/**
 * @swagger
 * path:
 *  /mail:
 *    post:
 *      summary: Send email
 *      tags: [Mail]
 *      parameters:
 *        - in: header
 *          name: x-api-key
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message: string
 *      security:
 *        - basicAuth: []
 */
router.post('/', profileByApiKey, controller.send);

module.exports = router;

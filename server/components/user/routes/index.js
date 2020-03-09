const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByApiKey = require('../../../middleware/profileByApiKey');
const profileByAccessToken = require('../../../middleware/profileByAccessToken');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /users:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      parameters:
 *        - in: header
 *          name: x-api-key
 *          schema:
 *            type: string
 *          required: true
 *        - filterParam:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *          in: query
 *          name: filter
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 *      security:
 *        - basicAuth: []
 */

router.get('/', profileByApiKey, controller.findAll);

router.get('/find/:id', profileByApiKey, controller.findByPk);

router.get('/findone', profileByApiKey, controller.findOne);

router.put('/update', profileByAccessToken, controller.update);

router.put('/password-change', profileByAccessToken, controller.changePassword);

router.delete('/remove', profileByAccessToken, controller.remove);

router.get('/count', profileByApiKey, controller.count);

module.exports = router;

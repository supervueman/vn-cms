const express = require('express');

const controller = require('../controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authenticate
 *   description: Authenticate management
 */

/**
 * @swagger
 * path:
 *  /authenticate/login-by-email:
 *    post:
 *      summary: Login by email
 *      tags: [Authenticate]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id: string
 *                  access_token: string
 *      security:
 *        - basicAuth: []
 */
router.post('/login-by-email', controller.loginByEmail);

/**
 * @swagger
 * path:
 *  /authenticate/login-by-phone:
 *    post:
 *      summary: Login by phone
 *      tags: [Authenticate]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id: string
 *                  access_token: string
 *      security:
 *        - basicAuth: []
 */
router.post('/login-by-phone', controller.loginByPhone);

module.exports = router;

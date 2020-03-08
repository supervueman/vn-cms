const express = require('express');

const controller = require('../controller');

const router = express.Router();

/**
 * @swagger
 * /login-by-email:
 *   post:
 *     description: Login to the application by email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login-by-email', controller.loginByEmail);

/**
 * @swagger
 * /login-by-phone:
 *   post:
 *     description: Login to the application by phone
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login-by-phone', controller.loginByPhone);

module.exports = router;

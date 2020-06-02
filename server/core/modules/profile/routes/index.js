const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../../middleware/profileByAccessToken');
const profileByApiKey = require('../../../../middleware/profileByApiKey');

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile management
 */

/**
 * @swagger
 * path:
 *  /profile:
 *    get:
 *      summary: Get profile
 *      tags: [Profile]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *        - filterParam:
 *          in: query
 *          name: filter
 *          description: See sequelize documentation https://sequelize.org/v5/manual/querying.html
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *      responses:
 *        "200":
 *          description: Profile object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.findByAccessToken);

/**
 * @swagger
 * path:
 *  /profile/create-by-email:
 *    post:
 *      summary: Create profile by email
 *      tags: [Profile]
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
 *              $ref: '#/components/schemas/UserCreate'
 *      responses:
 *        "200":
 *          description: Create profile schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      security:
 *        - basicAuth: []
 */
router.post('/create-by-email', profileByApiKey, controller.createByEmail);

/**
 * @swagger
 * path:
 *  /profile/update:
 *    put:
 *      summary: Update profile
 *      tags: [Profile]
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
 *              $ref: '#/components/schemas/UserUpdate'
 *      responses:
 *        "200":
 *          description: User schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      security:
 *        - basicAuth: []
 */
router.put('/update', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /profile/password-change:
 *    put:
 *      summary: Update profile
 *      tags: [Profile]
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
 *                oldPassword:
 *                  type: string
 *                newPassword:
 *                  type: string
 *      responses:
 *        "200":
 *          description: User schema
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
router.put('/password-change', profileByAccessToken, controller.changePassword);

/**
 * @swagger
 * path:
 *  /profile/password-reset-by-email-request:
 *    post:
 *      summary: Request for reset password
 *      tags: [Profile]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
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
router.post(
  '/password-reset-by-email-request',
  controller.resetPasswordByEmailRequest
);

/**
 * @swagger
 * path:
 *  /profile/password-reset-by-email:
 *    post:
 *      summary: Reset password
 *      tags: [Profile]
 *      parameters:
 *        - in: header
 *          name: x-reset-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
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
router.post('/password-reset-by-email', controller.resetPasswordByEmail);

/**
 * @swagger
 * path:
 *  /profile/verified-account-by-email-request:
 *    post:
 *      summary: Request for verified account
 *      tags: [Profile]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                currentEmail:
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
router.post(
  '/verified-account-by-email-request',
  controller.verifiedAccountByEmailRequest
);

/**
 * @swagger
 * path:
 *  /profile/verified-account-by-email:
 *    post:
 *      summary: Verified account
 *      tags: [Profile]
 *      parameters:
 *        - in: header
 *          name: x-verified-token
 *          required: true
 *          schema:
 *            type: string
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
router.post('/verified-account-by-email', controller.verifiedAccountByEmail);

/**
 * @swagger
 * path:
 *  /profile/remove:
 *    delete:
 *      summary: Delete profile
 *      tags: [Profile]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
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
router.delete('/remove', profileByAccessToken, controller.remove);

module.exports = router;

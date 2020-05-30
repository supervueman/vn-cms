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
 *          example:
 *            where:
 *              slug: admin
 *      responses:
 *        "200":
 *          description: Array user schema
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

/**
 * @swagger
 * path:
 *  /users/find/{id}:
 *    get:
 *      summary: Get user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: header
 *          name: x-api-key
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
 *          example:
 *            include: [context]
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
router.get('/find/:id', profileByApiKey, controller.findByPk);

/**
 * @swagger
 * path:
 *  /users/findone:
 *    get:
 *      summary: Get one user
 *      tags: [Users]
 *      parameters:
 *        - in: header
 *          name: x-api-key
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
 *          example:
 *            where:
 *              slug: admin
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
router.get('/findone', profileByApiKey, controller.findOne);

/**
 * @swagger
 * path:
 *  /users/update/{id}:
 *    put:
 *      summary: Update user
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
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
 *          example:
 *            where:
 *              slug: admin
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
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /users/password-change:
 *    put:
 *      summary: Update user
 *      tags: [Users]
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
 *                id:
 *                  type: string
 *                oldPassword:
 *                  type: string
 *                newPassword:
 *                  type: string
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                message: OK
 *      security:
 *        - basicAuth: []
 */
router.put('/password-change', profileByAccessToken, controller.changePassword);

/**
 * @swagger
 * path:
 *  /users/remove/{id}:
 *    delete:
 *      summary: Delete user
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
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
 *                id:
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
router.delete('/remove/:id', profileByAccessToken, controller.remove);

/**
 * @swagger
 * path:
 *  /users/count:
 *    get:
 *      summary: Get users count
 *      tags: [Users]
 *      parameters:
 *        - in: header
 *          name: x-api-key
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
 *          example:
 *            where:
 *              slug: admin
 *      responses:
 *        "200":
 *          description: Users count
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  count:
 *                    type: number
 *      security:
 *        - basicAuth: []
 */
router.get('/count', profileByApiKey, controller.count);

/**
 * @swagger
 * path:
 *  /users/change-role:
 *    put:
 *      summary: Update user role
 *      tags: [Users]
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
 *              parameters:
 *                userId:
 *                  type: number
 *                roleId:
 *                  type: number
 *      responses:
 *        "200":
 *          description: User schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                parameters:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.put('/change-role', profileByAccessToken, controller.changeRole);

module.exports = router;

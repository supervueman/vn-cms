const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management
 */

/**
 * @swagger
 * path:
 *  /roles:
 *    get:
 *      summary: Get all roles
 *      tags: [Roles]
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
 *          example:
 *            where:
 *              slug: admin
 *      responses:
 *        "200":
 *          description: Array role schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Role'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.findAll);

/**
 * @swagger
 * path:
 *  /roles/find/{id}:
 *    get:
 *      summary: Get role by id
 *      tags: [Roles]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: User schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByAccessToken, controller.findByPk);

/**
 * @swagger
 * path:
 *  /roles/findone:
 *    get:
 *      summary: Get one role
 *      tags: [Roles]
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
 *          example:
 *            where:
 *              slug: admin
 *      responses:
 *        "200":
 *          description: Role schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByAccessToken, controller.findOne);

/**
 * @swagger
 * path:
 *  /roles/create:
 *    post:
 *      summary: Create role
 *      tags: [Roles]
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
 *              $ref: '#/components/schemas/RoleCreate'
 *      responses:
 *        "200":
 *          description: Create role schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /roles/update:
 *    put:
 *      summary: Update role
 *      tags: [Roles]
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
 *              $ref: '#/components/schemas/RoleUpdate'
 *      responses:
 *        "200":
 *          description: Role schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *      security:
 *        - basicAuth: []
 */
router.put('/update', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /roles/remove:
 *    delete:
 *      summary: Delete role
 *      tags: [Roles]
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

/**
 * @swagger
 * path:
 *  /roles/count:
 *    get:
 *      summary: Get roles count
 *      tags: [Roles]
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
router.get('/count', profileByAccessToken, controller.count);

module.exports = router;

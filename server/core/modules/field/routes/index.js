const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../../middleware/profileByAccessToken');
/**
 * @swagger
 * tags:
 *   name: Fields
 *   description: Fields management
 */

/**
 * @swagger
 * path:
 *  /fields:
 *    get:
 *      summary: Get all fields
 *      tags: [Fields]
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
 *              slug: avatar
 *      responses:
 *        "200":
 *          description: Array fields schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Fields'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.findAll);

/**
 * @swagger
 * path:
 *  /fields/find/{id}:
 *    get:
 *      summary: Get fields by id
 *      tags: [Fields]
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
 *              slug: avatar
 *      responses:
 *        "200":
 *          description: Field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Field'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByAccessToken, controller.findByPk);

/**
 * @swagger
 * path:
 *  /fields/findone:
 *    get:
 *      summary: Get one field
 *      tags: [Fields]
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
 *              slug: avatar
 *      responses:
 *        "200":
 *          description: Field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Field'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByAccessToken, controller.findOne);

/**
 * @swagger
 * path:
 *  /fields/create:
 *    post:
 *      summary: Create field
 *      tags: [Fields]
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
 *              $ref: '#/components/schemas/FieldCreate'
 *      responses:
 *        "200":
 *          description: Create field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Field'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /fields/update/{id}:
 *    put:
 *      summary: Update field
 *      tags: [Fields]
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
 *              $ref: '#/components/schemas/FieldUpdate'
 *      responses:
 *        "200":
 *          description: Field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Field'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /fields/remove/{id}:
 *    delete:
 *      summary: Delete field
 *      tags: [Fields]
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
 *  /fields/count:
 *    get:
 *      summary: Get fields count
 *      tags: [Fields]
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
 *              slug: avatar
 *      responses:
 *        "200":
 *          description: Fields count
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

/**
 * @swagger
 * path:
 *  /fields/add-layout:
 *    put:
 *      summary: Add layouts to field
 *      tags: [Fields]
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
 *                layouts:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Field'
 *      security:
 *        - basicAuth: []
 */
router.put('/add-layout', profileByAccessToken, controller.addLayout);

/**
 * @swagger
 * path:
 *  /fields/remove-layout:
 *    put:
 *      summary: Remove from field
 *      tags: [Fields]
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
 *                layouts:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Field'
 *      security:
 *        - basicAuth: []
 */
router.put('/remove-layout', profileByAccessToken, controller.removeLayout);

module.exports = router;

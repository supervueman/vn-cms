const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');

/**
 * @swagger
 * tags:
 *   name: Layouts
 *   description: Layouts management
 */

/**
 * @swagger
 * path:
 *  /layouts:
 *    get:
 *      summary: Get all layouts
 *      tags: [Layouts]
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
 *              slug: base
 *      responses:
 *        "200":
 *          description: Array layouts schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Layout'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.findAll);

/**
 * @swagger
 * path:
 *  /layouts/find/{id}:
 *    get:
 *      summary: Get layouts by id
 *      tags: [Layouts]
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
 *              slug: base
 *      responses:
 *        "200":
 *          description: Layout schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Layout'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByAccessToken, controller.findByPk);

/**
 * @swagger
 * path:
 *  /layouts/findone:
 *    get:
 *      summary: Get one layout
 *      tags: [Layouts]
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
 *              slug: base
 *      responses:
 *        "200":
 *          description: Layout schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Layout'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByAccessToken, controller.findOne);

/**
 * @swagger
 * path:
 *  /layouts/create:
 *    post:
 *      summary: Create layout
 *      tags: [Layouts]
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
 *              $ref: '#/components/schemas/LayoutCreate'
 *      responses:
 *        "200":
 *          description: Create layout schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Layout'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /layouts/update:
 *    put:
 *      summary: Update layout
 *      tags: [Layouts]
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
 *              $ref: '#/components/schemas/LayoutUpdate'
 *      responses:
 *        "200":
 *          description: Layout schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Layout'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /layouts/remove:
 *    delete:
 *      summary: Delete layout
 *      tags: [Layouts]
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
 *  /layouts/count:
 *    get:
 *      summary: Get layouts count
 *      tags: [Layouts]
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
 *              slug: base
 *      responses:
 *        "200":
 *          description: Layouts count
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

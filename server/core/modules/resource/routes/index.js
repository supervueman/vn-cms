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
 *   name: Resources
 *   description: Resources management
 */

/**
 * @swagger
 * path:
 *  /resources:
 *    get:
 *      summary: Get all resources
 *      tags: [Resources]
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
 *              slug: index
 *              published: true
 *      responses:
 *        "200":
 *          description: Array resources schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Resource'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByApiKey, controller.findAll);

/**
 * @swagger
 * path:
 *  /resources/find/{id}:
 *    get:
 *      summary: Get resource by id
 *      tags: [Resources]
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
 *            include: ['context']
 *      responses:
 *        "200":
 *          description: Resource schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Resource'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByApiKey, controller.findByPk);

/**
 * @swagger
 * path:
 *  /resources/findone:
 *    get:
 *      summary: Get one resource
 *      tags: [Resources]
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
 *              slug: about
 *              published: true
 *      responses:
 *        "200":
 *          description: Resource schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Resource'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByApiKey, controller.findOne);

/**
 * @swagger
 * path:
 *  /resources/create:
 *    post:
 *      summary: Create resource
 *      tags: [Resources]
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
 *              $ref: '#/components/schemas/ResourceCreate'
 *      responses:
 *        "200":
 *          description: Create resource schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Resource'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /resources/update/{id}:
 *    put:
 *      summary: Update resource
 *      tags: [Resources]
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
 *              $ref: '#/components/schemas/ResourceUpdate'
 *      responses:
 *        "200":
 *          description: Resource schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Resource'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /resources/remove/{id}:
 *    delete:
 *      summary: Delete resource
 *      tags: [Resources]
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
 *  /resources/count:
 *    get:
 *      summary: Get resources count
 *      tags: [Resources]
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
 *      responses:
 *        "200":
 *          description: Resources count
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

router.put('/add-translation', profileByAccessToken, controller.addTranslation);

router.put('/add-tag', profileByAccessToken, controller.addTag);

router.put('/remove-tag', profileByAccessToken, controller.removeTag);

module.exports = router;

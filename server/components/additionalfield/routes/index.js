const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');
const profileByApiKey = require('../../../middleware/profileByApiKey');
/**
 * @swagger
 * tags:
 *   name: AdditionalFields
 *   description: Additional fields management
 */

/**
 * @swagger
 * path:
 *  /additionalfields:
 *    get:
 *      summary: Get all additional fields
 *      tags: [AdditionalFields]
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
 *          description: Array additional fields schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/AdditionalField'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByApiKey, controller.findAll);

/**
 * @swagger
 * path:
 *  /additionalfields/find/{id}:
 *    get:
 *      summary: Get additional fields by id
 *      tags: [AdditionalFields]
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
 *      responses:
 *        "200":
 *          description: Additional field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AdditionalField'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByApiKey, controller.findByPk);

/**
 * @swagger
 * path:
 *  /additionalfields/findone:
 *    get:
 *      summary: Get one additional field
 *      tags: [AdditionalFields]
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
 *          description: Additional field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AdditionalField'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByApiKey, controller.findOne);

/**
 * @swagger
 * path:
 *  /additonalfields/create:
 *    post:
 *      summary: Create additional field
 *      tags: [AdditionalFields]
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
 *              $ref: '#/components/schemas/AdditionaFieldCreate'
 *      responses:
 *        "200":
 *          description: Create additional field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AdditionalField'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /additionalfields/update/{id}:
 *    put:
 *      summary: Update additional field
 *      tags: [AdditionalFields]
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
 *              $ref: '#/components/schemas/AdditionalFieldUpdate'
 *      responses:
 *        "200":
 *          description: Additional field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AdditionalField'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /additionalfields/update-all:
 *    put:
 *      summary: Update additional field
 *      tags: [AdditionalFields]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Add array updated fields to fields property
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               fields:
 *                 type: string
 *      responses:
 *        "200":
 *          description: Additional field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AdditionalField'
 *      security:
 *        - basicAuth: []
 */
router.put('/update-all', profileByAccessToken, controller.updateAll);

/**
 * @swagger
 * path:
 *  /additionalfields/remove/{id}:
 *    delete:
 *      summary: Delete additional field
 *      tags: [AdditionalFields]
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

module.exports = router;

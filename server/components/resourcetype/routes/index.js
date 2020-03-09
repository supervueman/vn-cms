const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByApiKey = require('../../../middleware/profileByApiKey');

/**
 * @swagger
 * tags:
 *   name: ResourceTypes
 *   description: Resource types management
 */

/**
 * @swagger
 * path:
 *  /contexts:
 *    get:
 *      summary: Get all resource types
 *      tags: [ResourceTypes]
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
 *              slug: document
 *      responses:
 *        "200":
 *          description: Array resource type schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ResourceType'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByApiKey, controller.findAll);

/**
 * @swagger
 * path:
 *  /resourcetypes/findone:
 *    get:
 *      summary: Get one resource type
 *      tags: [ResourceTypes]
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
 *              slug: document
 *      responses:
 *        "200":
 *          description: Resource type schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ResourceType'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByApiKey, controller.findOne);

module.exports = router;

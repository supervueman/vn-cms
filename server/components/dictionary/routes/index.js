const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');
/**
 * @swagger
 * tags:
 *   name: Dictionaries
 *   description: Dictionaries management
 */

/**
 * @swagger
 * path:
 *  /dictionaries:
 *    get:
 *      summary: Get all dictionaries
 *      tags: [Dictionaries]
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
 *              lang: en
 *      responses:
 *        "200":
 *          description: Array dictionary schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Dictionary'
 *      security:
 *        - basicAuth: []
 */
router.get('/', controller.findAll);

/**
 * @swagger
 * path:
 *  /dictionaries/find/{id}:
 *    get:
 *      summary: Get dictionary by id
 *      tags: [Dictionaries]
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
 *              lang: en
 *      responses:
 *        "200":
 *          description: Dictionary schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Dictionary'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', controller.findByPk);

/**
 * @swagger
 * path:
 *  /dictionaries/findone:
 *    get:
 *      summary: Get one dictionary
 *      tags: [Dictionaries]
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
 *              lang: en
 *      responses:
 *        "200":
 *          description: Context schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Dictionary'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', controller.findOne);

/**
 * @swagger
 * path:
 *  /dictionaries/create:
 *    post:
 *      summary: Create dictionary
 *      tags: [Dictionaries]
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
 *              $ref: '#/components/schemas/DictionaryCreate'
 *      responses:
 *        "200":
 *          description: Create dictionary schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Dictionary'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /dictionaries/update:
 *    put:
 *      summary: Update dictionary
 *      tags: [Dictionaries]
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
 *              $ref: '#/components/schemas/DictionaryUpdate'
 *      responses:
 *        "200":
 *          description: Dictionary schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Dictionary'
 *      security:
 *        - basicAuth: []
 */
router.put('/update', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /dictionaries/remove:
 *    delete:
 *      summary: Delete dictionary
 *      tags: [Dictionaries]
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
router.delete('/remove', profileByAccessToken, controller.remove);

/**
 * @swagger
 * path:
 *  /dictionaries/count:
 *    get:
 *      summary: Get dictionaries count
 *      tags: [Dictionaries]
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
 *              lang: ar
 *      responses:
 *        "200":
 *          description: Dictionaries count
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
router.get('/count', controller.count);

module.exports = router;

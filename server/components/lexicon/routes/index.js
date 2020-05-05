const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');
/**
 * @swagger
 * tags:
 *   name: Lexicons
 *   description: Lexicons management
 */

/**
 * @swagger
 * path:
 *  /lexicons:
 *    get:
 *      summary: Get all lexicons
 *      tags: [Lexicons]
 *      parameters:
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
 *              langId: 1
 *      responses:
 *        "200":
 *          description: Array lexicon schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Lexicon'
 *      security:
 *        - basicAuth: []
 */
router.get('/', controller.findAll);

/**
 * @swagger
 * path:
 *  /lexicons/find/{id}:
 *    get:
 *      summary: Get lexicon by id
 *      tags: [Lexicons]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
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
 *              langId: 1
 *      responses:
 *        "200":
 *          description: Lexicon schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Lexicon'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', controller.findByPk);

/**
 * @swagger
 * path:
 *  /lexicons/findone:
 *    get:
 *      summary: Get one lexicon
 *      tags: [Lexicons]
 *      parameters:
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
 *              langId: 1
 *      responses:
 *        "200":
 *          description: Context schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Lexicon'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', controller.findOne);

/**
 * @swagger
 * path:
 *  /lexicons/create:
 *    post:
 *      summary: Create lexicon
 *      tags: [Lexicons]
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
 *          description: Create lexicon schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Lexicon'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /lexicons/update/{id}:
 *    put:
 *      summary: Update lexicon
 *      tags: [Lexicons]
 *      parameters:
 *        - filterParam:
 *          in: query
 *          name: filter
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
 *          description: Lexicon schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Lexicon'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /lexicons/remove/{id}:
 *    delete:
 *      summary: Delete lexicon
 *      tags: [Lexicons]
 *      parameters:
 *        - filterParam:
 *          in: query
 *          name: filter
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
 *  /lexicons/count:
 *    get:
 *      summary: Get lexicons count
 *      tags: [Lexicons]
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
 *              lexicon: ar
 *      responses:
 *        "200":
 *          description: Lexicons count
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

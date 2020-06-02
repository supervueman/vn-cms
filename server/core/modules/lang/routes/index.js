const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../../middleware/profileByAccessToken');
/**
 * @swagger
 * tags:
 *   name: Langs
 *   description: Langs management
 */

/**
 * @swagger
 * path:
 *  /langs:
 *    get:
 *      summary: Get all langs
 *      tags: [Langs]
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
 *              lang: en
 *      responses:
 *        "200":
 *          description: Array lang schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Lang'
 *      security:
 *        - basicAuth: []
 */
router.get('/', controller.findAll);

/**
 * @swagger
 * path:
 *  /langs/find/{id}:
 *    get:
 *      summary: Get lang by id
 *      tags: [Langs]
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
 *              lang: en
 *      responses:
 *        "200":
 *          description: Lang schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Lang'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', controller.findByPk);

/**
 * @swagger
 * path:
 *  /langs/findone:
 *    get:
 *      summary: Get one lang
 *      tags: [Langs]
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
 *              lang: en
 *      responses:
 *        "200":
 *          description: Context schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Lang'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', controller.findOne);

/**
 * @swagger
 * path:
 *  /langs/create:
 *    post:
 *      summary: Create lang
 *      tags: [Langs]
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
 *          description: Create lang schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Lang'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /langs/update/{id}:
 *    put:
 *      summary: Update lang
 *      tags: [Langs]
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
 *          description: Lang schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Lang'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /langs/remove/{id}:
 *    delete:
 *      summary: Delete lang
 *      tags: [Langs]
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
 *  /langs/count:
 *    get:
 *      summary: Get langs count
 *      tags: [Langs]
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
 *          description: Langs count
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

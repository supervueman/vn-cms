const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');

/**
 * @swagger
 * tags:
 *   name: Contexts
 *   description: Contexts management
 */

/**
 * @swagger
 * path:
 *  /contexts:
 *    get:
 *      summary: Get all contexts
 *      tags: [Contexts]
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
 *              slug: root
 *      responses:
 *        "200":
 *          description: Array context schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Context'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.findAll);

/**
 * @swagger
 * path:
 *  /contexts/find/{id}:
 *    get:
 *      summary: Get context by id
 *      tags: [Contexts]
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
 *              slug: root
 *      responses:
 *        "200":
 *          description: Context schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Context'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByAccessToken, controller.findByPk);

/**
 * @swagger
 * path:
 *  /contexts/findone:
 *    get:
 *      summary: Get one context
 *      tags: [Contexts]
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
 *              slug: root
 *      responses:
 *        "200":
 *          description: Context schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Context'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByAccessToken, controller.findOne);

/**
 * @swagger
 * path:
 *  /contexts/create:
 *    post:
 *      summary: Create context
 *      tags: [Contexts]
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
 *              $ref: '#/components/schemas/ContextCreate'
 *      responses:
 *        "200":
 *          description: Create context schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Context'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /context/update/{id}:
 *    put:
 *      summary: Update context
 *      tags: [Contexts]
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
 *              $ref: '#/components/schemas/ContextUpdate'
 *      responses:
 *        "200":
 *          description: Context schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Context'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /contexts/remove/{id}:
 *    delete:
 *      summary: Delete context
 *      tags: [Contexts]
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
 *  /contexts/count:
 *    get:
 *      summary: Get contexts count
 *      tags: [Contexts]
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
 *              slug: custom-context
 *      responses:
 *        "200":
 *          description: Contexts count
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

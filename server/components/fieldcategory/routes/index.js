const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');

/**
 * @swagger
 * tags:
 *   name: FieldCategories
 *   description: Field categories management
 */

/**
 * @swagger
 * path:
 *  /fieldcategories:
 *    get:
 *      summary: Get all field categories
 *      tags: [FieldCategories]
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
 *              title: My custom field category
 *      responses:
 *        "200":
 *          description: Array context schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/FieldCategory'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.findAll);

/**
 * @swagger
 * path:
 *  /fieldcategories/find/{id}:
 *    get:
 *      summary: Get field category by id
 *      tags: [FieldCategories]
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
 *              title: My custom field category
 *      responses:
 *        "200":
 *          description: Field category schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FieldCategory'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByAccessToken, controller.findByPk);

/**
 * @swagger
 * path:
 *  /fieldcategories/findone:
 *    get:
 *      summary: Get one field category
 *      tags: [FieldCategories]
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
 *              slug: My custom field category
 *      responses:
 *        "200":
 *          description: Field category schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FieldCategory'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByAccessToken, controller.findOne);

/**
 * @swagger
 * path:
 *  /fieldcategories/create:
 *    post:
 *      summary: Create field category
 *      tags: [FieldCategories]
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
 *              $ref: '#/components/schemas/FieldCategoryCreate'
 *      responses:
 *        "200":
 *          description: Create field category schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FieldCategory'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /fieldcategories/update/{id}:
 *    put:
 *      summary: Update field category
 *      tags: [FieldCategories]
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
 *              $ref: '#/components/schemas/FieldCategoryUpdate'
 *      responses:
 *        "200":
 *          description: Field category schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FieldCategory'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /fieldcategories/remove/{id}:
 *    delete:
 *      summary: Delete field category
 *      tags: [FieldCategories]
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
 *  /fieldcategories/count:
 *    get:
 *      summary: Get field categories count
 *      tags: [FieldCategories]
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
 *              title: My custom field category
 *      responses:
 *        "200":
 *          description: Field categories count
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

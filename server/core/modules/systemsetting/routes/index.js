const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Common middleware
const profileByAccessToken = require('../../../../middleware/profileByAccessToken');

/**
 * @swagger
 * tags:
 *   name: SystemSettings
 *   description: System settings management
 */

/**
 * @swagger
 * path:
 *  /systemsettings:
 *    get:
 *      summary: Get all system settings
 *      tags: [SystemSettings]
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
 *              slug: main_lang
 *      responses:
 *        "200":
 *          description: Array system settings schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/SystemSetting'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.findAll);

/**
 * @swagger
 * path:
 *  /systemsettings/findone:
 *    get:
 *      summary: Get one system setting
 *      tags: [SystemSettings]
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
 *              slug: main_lang
 *      responses:
 *        "200":
 *          description: System setting schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SystemSetting'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByAccessToken, controller.findOne);

/**
 * @swagger
 * path:
 *  /systemsettings/update/{id}:
 *    put:
 *      summary: Update system setting
 *      tags: [SystemSettings]
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
 *              $ref: '#/components/schemas/SystemSettingUpdate'
 *      responses:
 *        "200":
 *          description: System setting schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SystemSetting'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /systemsettings/count:
 *    get:
 *      summary: Get system settings count
 *      tags: [SystemSettings]
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
 *              slug: main_lang
 *      responses:
 *        "200":
 *          description: System settings count
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

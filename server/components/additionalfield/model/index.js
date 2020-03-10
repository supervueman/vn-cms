const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     AdditionalField:
 *       type: object
 *       required:
 *         - slug
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the additional field, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the additional field, needs to be unique.
 *         value:
 *           type: string
 *         field:
 *           type: object
 *           description: Association name field
 *         resource:
 *           type: object
 *           description: Association name resource
 *         category:
 *           type: object
 *           description: Association name category
 *       example:
 *         id: 1
 *         slug: avatar
 *         value: img/avatar.png
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     AdditionalFieldCreate:
 *       type: object
 *       required:
 *         - slug
 *       properties:
 *         slug:
 *           type: string
 *           description: Slug for the additional field, needs to be unique.
 *       example:
 *         slug: avatar
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     AdditionalFieldUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *           description: Slug for the additional field, needs to be unique.
 *         value:
 *           type: string
 *       example:
 *         id: 1
 *         slug: avatar
 *         value: img/avatar-2.png
 */
const Model = sequelize.define('additionalfield', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    notEmpty: true,
  },
  value: Sequelize.TEXT
});

module.exports = Model;

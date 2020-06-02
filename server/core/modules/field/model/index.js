const Sequelize = require('sequelize');
const sequelize = require('../../../db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Field:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *         - fieldType
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the field, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the field, needs to be unique.
 *         title:
 *           type: string
 *         fieldType:
 *           type: string
 *         schema:
 *           type: json
 *         defaultValue:
 *           type: string
 *         layouts:
 *           type: array
 *           description: Association name layouts
 *         category:
 *           type: object
 *           description: Association name category
 *       example:
 *         id: 1
 *         slug: avatar
 *         title: Avatar
 *         fieldType: image
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     FieldCreate:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *         - fieldType
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the field, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the field, needs to be unique.
 *         title:
 *           type: string
 *         fieldType:
 *           type: string
 *         schema:
 *           type: json
 *         defaultValue:
 *           type: string
 *         layoutId:
 *           type: array
 *           description: Array with ids layouts
 *         categoryId:
 *           type: id
 *           description: fieldcategory id
 *       example:
 *         id: 1
 *         slug: avatar
 *         title: Avatar
 *         fieldType: image
 *         categoryId: 1
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     FieldUpdate:
 *       properties:
 *         title:
 *           type: string
 *       example:
 *         title: Personal avatar
 */
const Model = sequelize.define('field', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    notEmpty: true,
    unique: true
  },
  title: Sequelize.STRING,
  fieldType: Sequelize.STRING,
  schema: Sequelize.TEXT,
  defaultValue: Sequelize.TEXT
});

module.exports = Model;

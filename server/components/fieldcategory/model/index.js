const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     FieldCategory:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the field category, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         id: 1
 *         title: My custom field category
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     FieldCategoryCreate:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *       example:
 *         title: My custom field category
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     FieldCategoryUpdate:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *       example:
 *         title: My custom field category
 */

const Model = sequelize.define('fieldcategory', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    unique: true,
    notEmpty: true,
    allowNull: false
  }
});

module.exports = Model;

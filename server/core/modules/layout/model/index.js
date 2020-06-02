const Sequelize = require('sequelize');
const sequelize = require('../../../db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Layout:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the layout, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the layout, needs to be unique.
 *         title:
 *           type: string
 *         fields:
 *           type: array
 *           description: Association name fields
 *       example:
 *         id: 1
 *         slug: about
 *         title: About
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     LayoutCreate:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *       properties:
 *         slug:
 *           type: string
 *           description: Slug for the layout, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         slug: about
 *         title: About
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     LayoutUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *           description: Slug for the layout, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         id: 2
 *         slug: about
 *         title: About
 */
const Model = sequelize.define('layout', {
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
  title: Sequelize.STRING
});

module.exports = Model;

const Sequelize = require('sequelize');
const sequelize = require('../../../db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Context:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the context, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the context, needs to be unique.
 *         title:
 *           type: string
 *         resources:
 *           type: array
 *           description: Association name resources
 *       example:
 *         id: 1
 *         slug: root
 *         title: Root
 *         resources: []
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ContextCreate:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *       properties:
 *         slug:
 *           type: string
 *           description: Slug for the role, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         slug: custom-context
 *         title: My custom context
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ContextUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *           description: Slug for the role, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         id: 2
 *         title: Manager role
 */

const Model = sequelize.define('context', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    unique: true,
    notEmpty: true
  },
  title: {
    type: Sequelize.STRING
  }
});

module.exports = Model;

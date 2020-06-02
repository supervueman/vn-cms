const Sequelize = require('sequelize');
const sequelize = require('../../../db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ResourceType:
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
 *       example:
 *         id: 1
 *         slug: root
 *         title: Root
 */
const Model = sequelize.define('resourcetype', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  title: Sequelize.STRING
});

module.exports = Model;

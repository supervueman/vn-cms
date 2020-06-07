const Sequelize = require('sequelize');
const sequelize = require('../../../db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the tag, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the tag, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         id: 1
 *         slug: red
 *         title: Red
 */

const Model = sequelize.define('tag', {
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

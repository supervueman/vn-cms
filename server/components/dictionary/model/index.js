const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Dictionary:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the dictionary, needs to be unique.
 *         lang:
 *           type: string
 *           description: Lang for the dictionary, needs to be unique.
 *         title:
 *           type: string
 *         value:
 *           type: array
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
 *     DictionaryCreate:
 *       type: object
 *       required:
 *         - lang
 *         - title
 *       properties:
 *         lang:
 *           type: string
 *           description: Lang for the dictionary, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         lang: ar
 *         title: Arabian
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     DictionaryUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *         lang:
 *           type: string
 *           description: Lang for the dictionary, needs to be unique.
 *         title:
 *           type: string
 *         value:
 *           type: string
 *       example:
 *         id: 3
 *         title: Arabian
 */
const Model = sequelize.define('dictionary', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  lang: {
    type: Sequelize.STRING,
    notEmpty: true,
    unique: true,
  },
  title: Sequelize.STRING,
  value: Sequelize.TEXT,
});

module.exports = Model;

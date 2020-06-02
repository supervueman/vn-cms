const Sequelize = require('sequelize');
const sequelize = require('../../../db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Lang:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the lang, needs to be unique.
 *         slug:
 *           type: string
 *           description: Lang for the lang, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         id: 1
 *         slug: root
 *         title: Root
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     LangCreate:
 *       type: object
 *       required:
 *         - lang
 *         - title
 *       properties:
 *         slug:
 *           type: string
 *           description: Lang for the lang, needs to be unique.
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
 *     LangUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *           description: Lang for the lang, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         id: 3
 *         title: Arabian
 */
const Model = sequelize.define('lang', {
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

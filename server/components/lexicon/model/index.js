const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Lexicon:
 *       type: object
 *       required:
 *         - slug
 *         - value
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the lexicon, needs to be unique.
 *         slug:
 *           type: string
 *           description: Lexicon for the lexicon, needs to be unique.
 *         value:
 *           type: string
 *       example:
 *         id: 1
 *         slug: hello_world
 *         value: Hello world
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     LexiconCreate:
 *       type: object
 *       required:
 *         - slug
 *         - value
 *       properties:
 *         slug:
 *           type: string
 *           description: Lexicon for the lexicon, needs to be unique.
 *         value:
 *           type: string
 *       example:
 *         slug: hello_world
 *         value: Hello world
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     LexiconUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *           description: Lexicon for the lexicon, needs to be unique.
 *         value:
 *           type: string
 *       example:
 *         id: 3
 *         slug: hello_world
 *         value: Hello world
 */
const Model = sequelize.define('lexicon', {
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
  value: Sequelize.STRING
});

module.exports = Model;

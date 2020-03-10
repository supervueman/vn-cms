const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the resource, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the resource, needs to be unique.
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         content:
 *           type: string
 *         published:
 *           type: boolean
 *         level:
 *           type: number
 *         lang:
 *           type: string
 *         menuindex:
 *           type: number
 *         additionalfields:
 *           type: array
 *           description: Association name additionalfields. See https://sequelize.org/v5/manual/associations.html
 *         context:
 *           type: object
 *           description: Association name context
 *         parent:
 *           type: object
 *           description: Association name parent
 *         layout:
 *           type: object
 *           description: Association name layout
 *         resourcetype:
 *           type: object
 *           description: Association name resourcetype
 *         translations:
 *           type: array
 *           description: Association name translations
 *         children:
 *           type: array
 *           description: Association name children
 *       example:
 *         id: 2
 *         slug: about
 *         title: About
 *         description: My new resource
 *         content: My new resource
 *         published: true
 *         level: 1
 *         lang: en
 *         menuindex: 2
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ResourceCreate:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *       properties:
 *         slug:
 *           type: string
 *           description: Slug for the resource, needs to be unique.
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
 *     ResourceUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *           description: Slug for the resource, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         id: 2
 *         slug: about
 *         title: About us
 */

const Model = sequelize.define('resource', {
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
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  content: Sequelize.TEXT,
  published: Sequelize.BOOLEAN,
  level: Sequelize.INTEGER,
  lang: Sequelize.STRING,
  menuindex: Sequelize.INTEGER
});

module.exports = Model;

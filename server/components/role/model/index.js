const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *         - rules
 *         - rang
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the role, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the role, needs to be unique.
 *         title:
 *           type: string
 *         rules:
 *           type: string
 *         rang:
 *           type: number
 *       example:
 *         id: 1
 *         slug: admin
 *         title: Admin
 *         rules: '{"is_system_setting_read":{"title":"Allow viewing system settings","value":true}}'
 *         rang: 9999
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     RoleCreate:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *         - rules
 *         - rang
 *       properties:
 *         slug:
 *           type: string
 *           description: Slug for the role, needs to be unique.
 *         title:
 *           type: string
 *         rules:
 *           type: string
 *         rang:
 *           type: number
 *       example:
 *         slug: custom-role
 *         title: My custom role
 *         rules: '{"is_system_setting_read":{"title":"Allow viewing system settings","value":true}}'
 *         rang: 8000
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     RoleUpdate:
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
 *         rules:
 *           type: string
 *         rang:
 *           type: number
 *       example:
 *         id: 3
 *         title: Manager role
 */
const Model = sequelize.define('role', {
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
  title: Sequelize.STRING,
  rules: Sequelize.TEXT,
  rang: Sequelize.INTEGER
});

module.exports = Model;

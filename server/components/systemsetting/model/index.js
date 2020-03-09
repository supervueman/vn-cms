const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     SystemSetting:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *         - setting
 *         - component
 *         - settingType
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the system setting, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the system setting, needs to be unique.
 *         title:
 *           type: string
 *         setting:
 *           type: string
 *         component:
 *           type: string
 *         settingType:
 *           type: string
 *       example:
 *         id: 2
 *         slug: main_lang
 *         title: Base lang
 *         setting: '{"value":"ru"}'
 *         conponent: base
 *         settingType: text
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     SystemSettingUpdate:
 *       type: object
 *       required:
 *         - id
 *         - setting
 *       properties:
 *         id:
 *           type: string
 *         setting:
 *           type: string
 *       example:
 *         id: 2
 *         setting: '{"value":"en"}'
 */
const SystemSetting = sequelize.define('systemsetting', {
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
  setting: Sequelize.STRING(1234),
  component: Sequelize.STRING,
  settingType: Sequelize.STRING
});

module.exports = SystemSetting;

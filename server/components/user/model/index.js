const Sequelize = require('sequelize');
const SequelizeTokenify = require('sequelize-tokenify');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - slug
 *         - email
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the user, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the user, needs to be unique.
 *         email:
 *           type: string
 *           format: email
 *           description: Email for the user, needs to be unique.
 *         phone:
 *           type: string
 *           format: phone
 *           description: Phone for the user, needs to be unique.
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         middlename:
 *           type: string
 *         birthday:
 *           type: date
 *         country:
 *           type: string
 *         city:
 *           type: string
 *         street:
 *           type: string
 *         home:
 *           type: string
 *         apartment:
 *           type: string
 *         image:
 *           type: string
 *         facebook:
 *           type: string
 *         vkontakte:
 *           type: string
 *         instagram:
 *           type: string
 *         password:
 *           type: string
 *         token:
 *           type: string
 *           description: Token for the user, needs to be unique. Use for x-api-key
 *         verified:
 *           type: boolean
 *         roleId:
 *           type: string
 *           description: Association name role
 *         contextId:
 *           type: string
 *           description: Association name context
 *       example:
 *         id: 1
 *         slug: admin
 *         email: admin@email.com
 *         phone: +7 (951) 111-11-11
 *         firstname: Admin
 *         lastname: Manager
 *         country: Russia
 *         image: files/image.png
 *         token: Dxsb23c
 *         veryfied: true
 *         roleId: 1
 *         contextId: 1
 */

/**
* @swagger
*
* components:
*   schemas:
*     UserUpdate:
*       type: object
*       required:
*         - id
*         - slug
*         - email
*         - phone
*       properties:
*         id:
*           type: string
*         slug:
*           type: string
*           description: Slug for the user, needs to be unique.
*         email:
*           type: string
*           format: email
*           description: Email for the user, needs to be unique.
*         phone:
*           type: string
*           format: phone
*           description: Phone for the user, needs to be unique.
*         firstname:
*           type: string
*         lastname:
*           type: string
*         middlename:
*           type: string
*         birthday:
*           type: date
*         country:
*           type: string
*         city:
*           type: string
*         street:
*           type: string
*         home:
*           type: string
*         apartment:
*           type: string
*         image:
*           type: string
*         facebook:
*           type: string
*         vkontakte:
*           type: string
*         instagram:
*           type: string
*         verified:
*           type: boolean
*         roleId:
*           type: string
*           description: Association name role
*         contextId:
*           type: string
*           description: Association name context
*       example:
*         id: 1
*         firstname: Admin
*         lastname: Manager
*/
const Model = sequelize.define('user', {
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
  email: {
    type: Sequelize.STRING,
    unique: true,
    isEmail: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
    notEmpty: false
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  middlename: Sequelize.STRING,
  birthday: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  country: Sequelize.STRING,
  city: Sequelize.STRING,
  street: Sequelize.STRING,
  home: Sequelize.STRING,
  apartment: Sequelize.STRING,
  image: Sequelize.STRING,
  facebook: Sequelize.STRING,
  vkontakte: Sequelize.STRING,
  instagram: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  token: {
    type: Sequelize.STRING,
    unique: true
  },
  verified: {
    type: Sequelize.BOOLEAN
  }
});

Model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

SequelizeTokenify.tokenify(Model);

module.exports = Model;

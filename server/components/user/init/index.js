require('dotenv').config();
const bcrypt = require('bcrypt');

// Models
const Model = require('../model');
const Role = require('../../role/model');

// Handlers
const createDir = require('../../../handlers/createDir');

module.exports = async () => {
  const adminRole = await Role.findOne({
    where: {
      slug: 'admin'
    }
  });

  let admin = await Model.findOne({
    where: {
      slug: 'admin'
    }
  });

  if (!admin) {
    const passwordHw = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

    admin = await Model.create({
      slug: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: passwordHw,
      roleId: adminRole.id
    });

    await createDir(`../files/${admin.id}`);
  }
};

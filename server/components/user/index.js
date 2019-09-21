require('dotenv').config();
const bcrypt = require('bcrypt');

// Models
const Role = require('../../models/role');
const User = require('../../models/user');

// Handlers
const createDir = require('../../handlers/createDir');

module.exports = async () => {
  const adminRole = await Role.findOne({
    where: {
      slug: 'admin'
    }
  });

  let admin = await User.findOne({
    where: {
      slug: 'admin'
    }
  });

  if (!admin) {
    const passwordHw = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

    admin = await User.create({
      slug: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: passwordHw,
      roleId: adminRole.id
    });

    await createDir(`../files/${admin.id}`);
  }
};

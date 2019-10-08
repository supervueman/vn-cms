// Models
const Role = require('../../models/role');

module.exports = async () => {
  let adminRole = await Role.findOne({
    where: {
      slug: 'admin'
    }
  });

  if (!adminRole) {
    adminRole = await Role.create({
      slug: 'admin',
      title: 'Администратор',
    });
  }

  console.log(adminRole)

  let managerRole = await Role.findOne({
    where: {
      slug: 'manager'
    }
  });

  if (!managerRole) {
    managerRole = await Role.create({
      slug: 'manager',
      title: 'Менеджер',
    });
  }

  let userRole = await Role.findOne({
    where: {
      slug: 'user'
    }
  });

  if (!userRole) {
    userRole = await Role.create({
      slug: 'user',
      title: 'Пользователь',
    });
  }
}

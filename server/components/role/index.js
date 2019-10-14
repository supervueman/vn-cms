// Models
const Role = require('../../models/role');

// Base rules
const rules_admin = require('./rules_admin.json');
const rules_manager = require('./rules_manager.json');


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
      rules: JSON.stringify(rules_admin)
    });
  }

  let managerRole = await Role.findOne({
    where: {
      slug: 'manager'
    }
  });

  if (!managerRole) {
    managerRole = await Role.create({
      slug: 'manager',
      title: 'Менеджер',
      rules: JSON.stringify(rules_manager)
    });
  }
}

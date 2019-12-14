// Models
const Model = require('../model');

// Base rules
const rules_default = require('../data/rules_default.json');
const rules_admin = require('../data/rules_admin.json');
const rules_manager = require('../data/rules_manager.json');

module.exports = async () => {
  let defaultRole = await Model.findOne({
    where: {
      slug: 'default'
    }
  });

  if (!defaultRole) {
    defaultRole = await Model.create({
      slug: 'default',
      title: 'По умолчанию',
      rules: JSON.stringify(rules_default),
      rang: 0
    });
  }

  let adminRole = await Model.findOne({
    where: {
      slug: 'admin'
    }
  });

  if (!adminRole) {
    adminRole = await Model.create({
      slug: 'admin',
      title: 'Администратор',
      rules: JSON.stringify(rules_admin),
      rang: 9999
    });
  }

  let managerRole = await Model.findOne({
    where: {
      slug: 'manager'
    }
  });

  if (!managerRole) {
    managerRole = await Model.create({
      slug: 'manager',
      title: 'Менеджер',
      rules: JSON.stringify(rules_manager),
      rang: 9000
    });
  }
};

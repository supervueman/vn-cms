const fs = require('fs')

const Role = require('../../../../role/model');

// New rules
const orderRulesAdmin = require('../data/rules_admin.json');
const orderRulesManager = require('../data/rules_manager.json');
const orderRulesDefault = require('../data/rules_default.json');

// Default rules
const rulesDefault = require('../../../../role/data/rules_default.json');

module.exports = async () => {
  // New rules for admin
  const adminRole = await Role.findOne({
    where: {
      slug: 'admin'
    }
  });
  const rulesAdmin = JSON.parse(adminRole.rules);
  for (const rule in orderRulesAdmin) {
    if (!rulesAdmin[rule]) {
      rulesAdmin[rule] = orderRulesAdmin[rule];
    }
  }
  await adminRole.update({
    rules: JSON.stringify(rulesAdmin)
  });

  // New rules for manager
  const managerRole = await Role.findOne({
    where: {
      slug: 'manager'
    }
  });
  const rulesManager = JSON.parse(managerRole.rules);
  for (const rule in orderRulesManager) {
    if (!rulesManager[rule]) {
      rulesManager[rule] = orderRulesManager[rule];
    }
  }
  await managerRole.update({
    rules: JSON.stringify(rulesManager)
  });

  // New default rules
  for (const rule in orderRulesDefault) {
    if (!rulesDefault[rule]) {
      rulesDefault[rule] = orderRulesDefault[rule];
    }
  }
  const rulesDefaultJSON = JSON.stringify(rulesDefault);
  fs.writeFileSync(`./components/role/data/rules_default.json`, rulesDefaultJSON);
}

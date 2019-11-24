const fs = require('fs')

const Role = require('../../../../role/model');

// New rules
const cartRulesAdmin = require('../data/rules_admin.json');
const cartRulesManager = require('../data/rules_manager.json');
const cartRulesDefault = require('../data/rules_default.json');

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
  for (const rule in cartRulesAdmin) {
    if (!rulesAdmin[rule]) {
      rulesAdmin[rule] = cartRulesAdmin[rule];
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
  for (const rule in cartRulesManager) {
    if (!rulesManager[rule]) {
      rulesManager[rule] = cartRulesManager[rule];
    }
  }
  await managerRole.update({
    rules: JSON.stringify(rulesManager)
  });

  // New default rules
  for (const rule in cartRulesDefault) {
    if (!rulesDefault[rule]) {
      rulesDefault[rule] = cartRulesDefault[rule];
    }
  }
  const rulesDefaultJSON = JSON.stringify(rulesDefault);
  fs.writeFileSync(`./components/role/data/rules_default.json`, rulesDefaultJSON);
};

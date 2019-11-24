const fs = require('fs')

const Role = require('../../../../role/model');

// New rules
const deliveryRulesAdmin = require('../data/rules_admin.json');
const deliveryRulesManager = require('../data/rules_manager.json');
const deliveryRulesDefault = require('../data/rules_default.json');
const deliveryRulesCourier = require('../data/rules_courier.json');

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
  for (const rule in deliveryRulesAdmin) {
    if (!rulesAdmin[rule]) {
      rulesAdmin[rule] = deliveryRulesAdmin[rule];
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
  for (const rule in deliveryRulesManager) {
    if (!rulesManager[rule]) {
      rulesManager[rule] = deliveryRulesManager[rule];
    }
  }
  await managerRole.update({
    rules: JSON.stringify(rulesManager)
  });

  // New rules for manager
  const courierRole = await Role.findOne({
    where: {
      slug: 'courier'
    }
  });
  if (!courierRole) {
    await Role.create({
      slug: 'courier',
      title: 'Курьер',
      rules: JSON.stringify(deliveryRulesCourier)
    });
  }

  // New default rules
  for (const rule in deliveryRulesDefault) {
    if (!rulesDefault[rule]) {
      rulesDefault[rule] = deliveryRulesDefault[rule];
    }
  }
  const rulesDefaultJSON = JSON.stringify(rulesDefault);
  fs.writeFileSync(`./components/role/data/rules_default.json`, rulesDefaultJSON);
}

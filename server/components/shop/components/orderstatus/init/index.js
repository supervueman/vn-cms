const fs = require('fs');

const Model = require('../model');
const Role = require('../../../../role/model');

const orderstatusesData = require('../data/orderstatuses.json');

// New rules
const orderStatusRulesAdmin = require('../data/rules_admin.json');
const orderStatusRulesManager = require('../data/rules_manager.json');
const orderStatusRulesDefault = require('../data/rules_default.json');

// Default rules
const rulesDefault = require('../../../../role/data/rules_default.json');

module.exports = async () => {
  for await (let item of orderstatusesData) {
    const existItem = await Model.findOne({
      where: {
        title: item.title
      }
    });

    if (!existItem) {
      await Model.create({
        ...item
      });
    }
  }

  // New rules for admin
  const adminRole = await Role.findOne({
    where: {
      slug: 'admin'
    }
  });
  const rulesAdmin = JSON.parse(adminRole.rules);
  for (const rule in orderStatusRulesAdmin) {
    if (!rulesAdmin[rule]) {
      rulesAdmin[rule] = orderStatusRulesAdmin[rule];
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
  for (const rule in orderStatusRulesManager) {
    if (!rulesManager[rule]) {
      rulesManager[rule] = orderStatusRulesManager[rule];
    }
  }
  await managerRole.update({
    rules: JSON.stringify(rulesManager)
  });

  // New default rules
  for (const rule in orderStatusRulesDefault) {
    if (!rulesDefault[rule]) {
      rulesDefault[rule] = orderStatusRulesDefault[rule];
    }
  }
  const rulesDefaultJSON = JSON.stringify(rulesDefault);
  fs.writeFileSync(`./components/role/data/rules_default.json`, rulesDefaultJSON);
};

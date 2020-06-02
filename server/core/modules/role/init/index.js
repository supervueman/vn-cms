// New rules
const newRulesAdmin = require('../data/rules_admin.json');
const newRulesManager = require('../data/rules_manager.json');
const newRulesDefault = require('../data/rules_default.json');

// Healpers
const addNewRules = require('../handlers/addNewRules');

module.exports = async () => {
  await addNewRules('default', newRulesDefault, 'Default', 0);
  await addNewRules('admin', newRulesAdmin, 'Admin', 9999);
  await addNewRules('manager', newRulesManager, 'Manager', 9000);
};

const defaultRules = require('../data/rules_default.json');

module.exports = async (req, res) => {
  if (!req.rules.is_roles_read) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  res.status(200).send(defaultRules);
};

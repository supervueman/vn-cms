const Role = require('../components/role/model');

module.exports = async (roleSlug, newRules) => {
  const role = await Role.findOne({
    where: {
      slug: roleSlug
    }
  });

  const currentRules = JSON.parse(role.rules);

  for (const rule in newRules) {
    if (!currentRules[rule]) {
      currentRules[rule] = newRules[rule];
    }
  }
  await role.update({
    rules: JSON.stringify(currentRules)
  });
};

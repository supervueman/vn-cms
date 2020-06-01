const Role = require('../components/role/model');

module.exports = async (roleSlug, newRules, title, rang) => {
  let role = await Role.findOne({
    where: {
      slug: roleSlug
    }
  });

  if (!role) {
    role = await Role.create({
      slug: roleSlug,
      title: title || roleSlug,
      rang,
      rules: '{}'
    });
  }

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

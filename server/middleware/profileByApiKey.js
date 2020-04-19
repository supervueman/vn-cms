// Models
const User = require('../components/user/model');

module.exports = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  const isApiKey = typeof apiKey === 'string' && !!apiKey;

  if (!isApiKey) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const profile = await User.findOne({
    where: {
      token: req.headers['x-api-key']
    },
    include: ['role', 'context']
  });

  if (!profile) {
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  if (!profile.verified) {
    res.status(403).send({
      message: 'Account is not verified'
    });
    return;
  }

  // Задаем правила глобально
  req.rules = {};
  const rules = JSON.parse(profile.role.rules);
  for (const rule in rules) {
    req.rules[rule] = rules[rule].value;
  }

  // Определяем доступ роли динамически
  req[`${profile.role.slug}Access`] = true;

  req.id = profile.id;

  req.context = profile.context;

  req.email = profile.email;
  req.phone = profile.phone;

  req.rang = profile.role.rang;

  req.isAuth = true;

  next();
};

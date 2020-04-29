// Models
const User = require('../components/user/model');

module.exports = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  const isApiKey = typeof apiKey === 'string' && !!apiKey;

  if (!isApiKey) {
    logger(
      'error',
      'middlware',
      403,
      'profileByApiKey.js',
      'apiKey is not valid'
    );
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
  }).catch((err) => {
    logger('error', 'middlware', 400, 'profileByApiKey.js', err);
  });

  if (!profile) {
    logger(
      'error',
      'middlware',
      404,
      'profileByApiKey.js',
      'Profile not found'
    );
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  if (!profile.verified) {
    logger(
      'error',
      'middlware',
      403,
      'profileByApiKey.js',
      'Account is not verified'
    );
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

// Models
const User = require('../core/modules/user/model');

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
    sendRes({ res, status: 403 });
  }

  const profile = await User.findOne({
    where: {
      token: req.headers['x-api-key']
    },
    include: ['role', 'context']
  }).catch((err) => {
    logger('error', 'middlware', 400, 'profileByApiKey.js', err);
    sendRes({ res, status: 400 });
  });

  if (!profile) {
    logger(
      'error',
      'middlware',
      404,
      'profileByApiKey.js',
      'Profile not found'
    );
    sendRes({ res, status: 404 });
  }

  if (!profile.verified) {
    logger(
      'error',
      'middlware',
      403,
      'profileByApiKey.js',
      'Account is not verified'
    );
    sendRes({ res, status: 403 });
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

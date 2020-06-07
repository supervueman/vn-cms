const jwt = require('jsonwebtoken');

// Models
const User = require('../core/modules/user/model');

module.exports = async (req, res, next) => {
  const accessToken = req.headers['x-access-token'];

  const isAccessToken = typeof accessToken === 'string' && !!accessToken;

  // Если не верный access token то запрещено
  if (!isAccessToken) {
    logger(
      'error',
      'middlware',
      403,
      'profileByAccessToken.js',
      'Access token is not valid'
    );
    sendRes({ res, status: 403 });
  }

  // Проверка access token на действительность
  await jwt.verify(
    accessToken,
    process.env.SECRET_KEY_FOR_JWT,
    async (err, decoded) => {
      if (err || !decoded) {
        logger('error', 'middlware', 401, 'profileByAccessToken.js', err);
        sendRes({ res, status: 401 });
      }

      const profile = await User.findByPk(decoded.id, {
        include: ['role', 'context']
      });

      if (!profile) {
        logger(
          'error',
          'middlware',
          404,
          'profileByAccessToken.js',
          'Profile not found'
        );
        sendRes({ res, status: 404 });
      }

      if (!profile.verified) {
        logger(
          'error',
          'middlware',
          403,
          'profileByAccessToken.js',
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

      req.role = profile.role.slug;
      req.rang = profile.role.rang;

      req.isAuth = true;

      next();
    }
  );
};

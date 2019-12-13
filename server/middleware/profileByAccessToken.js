const jwt = require('jsonwebtoken');

// Models
const User = require('../components/user/model');

module.exports = async (req, res, next) => {
  const accessToken = req.headers['x-access-token'];

  const isAccessToken = typeof accessToken === 'string' && !!accessToken;

  // Если не верный access token то запрещено
  if (!isAccessToken) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  // Проверка access token на действительность
  await jwt.verify(accessToken, process.env.SECRET_KEY_FOR_JWT, async (err, decoded) => {
    if (err || !decoded) {
      res.status(401).send({
        message: 'Unauthorized'
      });
      return;
    }

    const profile = await User.findByPk(decoded.id, {
      include: ['role', 'context']
    });

    if (!profile) {
      res.status(404).send({
        message: 'Not found'
      });
      return;
    }

    // Задаем правила глобально
    req.rules = {};
    for (const rule in JSON.parse(profile.role.rules)) {
      req.rules[rule] = rules[rule].value;
    }

    // Определяем доступ роли динамически
    req[`${profile.role.slug}Access`] = true;

    req.context = profile.context;

    req.email = profile.email;
    req.phone = profile.phone;

    req.isAuth = true;

    next();
  });
};

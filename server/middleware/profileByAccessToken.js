const jwt = require('jsonwebtoken');

// Handlers
const accessHandler = require('../handlers/access');

// Models
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const accessToken = req.headers['x-access-token'];
  const isAccessToken = accessToken !== null && accessToken !== undefined && accessToken !== '' && accessToken !== 'null' && accessToken !== 'undefined';

  if (!isAccessToken) {
    return next();
  }

  await jwt.verify(accessToken, process.env.SECRET_KEY_FOR_JWT, async (err, decoded) => {
    if (err) {
      return next();
    }

    if (!decoded) {
      return next();
    }

    const profile = await User.findByPk(decoded.uid, {
      include: ['role']
    });

    if (!profile) {
      return next();
    }

    req.isAuth = true;
    req.profile = profile;
    const rules = JSON.parse(profile.role.rules);
    for (const rule in rules) {
      rules[rule] = rules[rule].value;
    }
    req.rules = rules;

    accessHandler(req, profile.role.slug);

    next();
  });
}

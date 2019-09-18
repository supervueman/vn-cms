const jwt = require('jsonwebtoken');

// Handlers
const accessHandler = require('../handlers/access');

// Models
const User = require('../models/user');
const Role = require('../models/role');

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
      include: [{
        model: Role
      }]
    });

    if (!profile) {
      return next();
    }

    req.isAuth = true;
    req.profile = profile;

    accessHandler(req, profile.role.slug);

    next();
  });
}

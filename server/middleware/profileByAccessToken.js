const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');
const Role = require('../models/Role');

module.exports = async (req, res, next) => {
  if (req.headers['x-access-token'] === 'null' || req.headers['x-access-token'] === '') {
    return next();
  }

  const decoded = await jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY_FOR_JWT);

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

  req.profile = profile;

  next();
}

// Models
const User = require('../models/user');
const Role = require('../models/Role');

module.exports = async (req, res, next) => {
  if (req.headers['x-api-key'] === 'null' || req.headers['x-api-key'] === '') {
    return next();
  }

  const profile = await User.findOne({
    where: {
      token: req.headers['x-api-key']
    },
    include: [{
      model: Role
    }]
  });

  if (!profile) {
    return next();
  }

  req.profile = profile;
  if (profile.role.slug === 'admin') {
    req.adminAccess = true;
  } else if (profile.role.slug === 'manager') {
    req.managerAccess = true;
  } else {
    req.otherAccess = true;
  }

  next();
}

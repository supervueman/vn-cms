// Handlers
const accessHandler = require('../handlers/access');

// Models
const User = require('../models/user');
const Role = require('../models/role');

module.exports = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const isApiKey = apiKey !== null && apiKey !== undefined && apiKey !== '' && apiKey !== 'null';
  if (!isApiKey) {
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

  accessHandler(req, profile.role.slug);

  next();
}

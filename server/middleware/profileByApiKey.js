// Handlers
const accessHandler = require('../handlers/access');

// Models
const User = require('../models/user');

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
    include: ['role']
  });

  if (!profile) {
    return next();
  }

  req.profile = profile;
  const rules = JSON.parse(profile.role.rules);
  for (const rule in rules) {
    rules[rule] = rules[rule].value;
  }
  req.rules = rules;

  accessHandler(req, profile.role.slug);

  next();
}

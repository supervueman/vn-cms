const User = require('../../user/model');

module.exports = async (req, res) => {
  if (!req.id) {
    logger('error', 'profile', 404, 'findByAccessToken.js');
    sendRes({ res, status: 404 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const user = await User.findByPk(req.id, filter);

  sendRes({ res, status: 200, data: user });
};

const User = require('../../user/model');

module.exports = async (req, res) => {
  if (!req.id) {
    logger('error', 'profile', 404, 'findByAccessToken.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const user = await User.findByPk(req.id, filter);

  res.status(200).send(user);
};

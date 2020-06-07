const User = require('../../user/model');

module.exports = async (req, res) => {
  await User.destroy({
    where: {
      id: req.id
    }
  }).catch((err) => {
    logger('error', 'profile', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200 });
};

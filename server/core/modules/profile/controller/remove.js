const User = require('../../user/model');

module.exports = async (req, res) => {
  await User.destroy({
    where: {
      id: req.id
    }
  }).catch((err) => {
    logger('error', 'profile', 400, 'remove.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send({
    message: 'OK'
  });
};

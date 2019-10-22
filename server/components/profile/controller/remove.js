const User = require('../../user/model');

const removeDir = require('../../../handlers/removeDir');

module.exports = async (req, res) => {
  if (!req.profile) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }

  removeDir(`../files/${req.profile.id}`);

  await User.destroy({
    where: {
      id: req.profile.id
    }
  });

  res.status(200).send({
    message: 'Success!'
  });
}

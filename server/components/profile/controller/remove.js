const User = require('../../user/model');

const removeDir = require('../../../handlers/removeDir');

module.exports = async (req, res) => {
  removeDir(`../files/user-${req.context.slug}-${req.id}`);

  await User.destroy({
    where: {
      id: req.id
    }
  });

  res.status(200).send({
    message: 'OK'
  });
};

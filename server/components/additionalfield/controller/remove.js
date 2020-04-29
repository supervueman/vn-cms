const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.isAuth) {
    logger('error', 'additionalfields', 403, 'remove.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'additionalfields', 403, 'remove.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(204).send({
    message: 'No content'
  });
};

const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_user_read) {
    logger('error', 'user', 403, 'findByPk.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findByPk(req.params.id, filter).catch((err) => {
    logger('error', 'user', 400, 'findByPk.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'user', 404, 'findByPk.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  if (!req.adminAccess && item.contextId !== req.context.id) {
    logger('error', 'user', 403, 'findByPk.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  res.status(200).send(item);
};

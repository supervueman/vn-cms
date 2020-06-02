const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_read) {
    logger('error', 'resource', 403, 'findByPk.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findByPk(req.params.id, filter).catch((err) => {
    logger('error', 'resource', 400, 'findByPk.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'resource', 404, 'findByPk.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'resource', 403, 'findByPk.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  res.status(200).send(item);
};

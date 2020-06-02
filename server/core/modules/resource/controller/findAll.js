const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_read) {
    logger('error', 'resource', 403, 'findAll.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  if (!filter.where && req.context.slug !== 'root') {
    filter.where = {};
  }
  if (req.context.slug !== 'root') {
    filter.where.contextId = req.context.id;
  }

  const items = await Model.findAll(filter).catch((err) => {
    logger('error', 'resource', 400, 'findAll.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(items);
};

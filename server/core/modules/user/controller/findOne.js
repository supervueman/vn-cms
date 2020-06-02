const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_user_read) {
    logger('error', 'user', 403, 'findOne.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findOne(filter);

  if (!item) {
    logger('error', 'user', 404, 'findOne.js');
    res.status(404).send({
      message: 'Not found'
    });
  }

  if (!req.adminAccess && item.contextId !== req.context.id) {
    logger('error', 'user', 403, 'findOne.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  res.status(200).send(item);
};

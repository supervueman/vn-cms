const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_role_read) {
    logger('error', 'role', 403, 'findOne.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findOne(filter).catch((err) => {
    logger('error', 'role', 400, 'findOne.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'role', 404, 'findOne.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  if (item.rang > req.rang) {
    logger('error', 'role', 403, 'findOne.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  res.status(200).send(item);
};

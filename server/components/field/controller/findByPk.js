const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_read) {
    logger('error', 'field', 403, 'findByPk.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findByPk(req.params.id, filter).catch((err) => {
    logger('error', 'field', 400, 'findByPk.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'field', 404, 'findByPk.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  res.status(200).send(item);
};

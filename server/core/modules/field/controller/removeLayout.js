const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_update) {
    logger('error', 'field', 403, 'removeLayout.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id).catch((err) => {
    logger('error', 'field', 400, 'removeLayout.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'field', 404, 'removeLayout.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  for await (const layout of req.body.layouts) {
    await item.removeLayout(layout).catch((err) => {
      logger('error', 'field', 400, 'removeLayout.js', err);
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });
  }

  const updatedItem = await Model.findByPk(req.body.id, {
    include: ['layouts']
  }).catch((err) => {
    logger('error', 'field', 400, 'removeLayout.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(updatedItem);
};

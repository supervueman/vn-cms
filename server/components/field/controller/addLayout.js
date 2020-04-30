const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_update) {
    logger('error', 'field', 403, 'addLayout.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id).catch((err) => {
    logger('error', 'field', 400, 'addLayout.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'field', 404, 'addLayout.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  for await (const layout of req.body.layouts) {
    await item.addLayout(layout).catch((err) => {
      logger('error', 'field', 400, 'addLayout.js', err);
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });
  }

  const updatedItem = await Model.findByPk(req.body.id, {
    include: ['layouts']
  }).catch((err) => {
    logger('error', 'field', 400, 'addLayout.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(updatedItem);
};

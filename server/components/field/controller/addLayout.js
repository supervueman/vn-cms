const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_update) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  for await (const layout of req.body.layouts) {
    await item.addLayout(layout).catch(err => {
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });
  }

  const updatedItem = await Model.findByPk(req.body.id, {
    include: ['layouts']
  }).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(updatedItem);
};

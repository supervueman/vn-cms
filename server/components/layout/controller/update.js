const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_layout_update) {
    logger('error', 'layout', 403, 'update.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'layout', 400, 'update.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'layout', 404, 'update.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  const updateItem = req.body;
  delete updateItem.id;

  const updatedItem = await item.update(updateItem).catch((err) => {
    logger('error', 'layout', 400, 'update.js', err);
    res.status(404).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(updatedItem);
};

const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_context_update) {
    logger('error', 'context', 403, 'update.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'context', 400, 'update.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'context', 404, 'update.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  // Запрет на обновление контекста root
  if (item.slug === 'root') {
    logger('error', 'context', 403, 'update.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  delete req.body.id;

  const updatedItem = await item.update(req.body).catch((err) => {
    logger('error', 'context', 400, 'update.js');
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(updatedItem);
};

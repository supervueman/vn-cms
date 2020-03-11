const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_context_update) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.params.id).catch(err => {
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

  // Запрет на обновление контекста root
  if (item.slug === 'root') {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  delete req.body.id;

  const updatedItem = await item.update(req.body).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(updatedItem);
};

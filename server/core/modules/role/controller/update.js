const Model = require('../model');

module.exports = async (req, res) => {
  // Если нет доступа к редактированию и ранг роли пользователя ниже ранга редактируемой роли то запретить
  // Так же нельзя обновлять роли admin и default
  if (!req.rules.is_role_update || req.rang < req.body.rang) {
    logger('error', 'role', 403, 'update.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  if (req.body.slug === 'default') {
    delete req.body.slug;
  }

  if (req.body.slug === 'admin') {
    delete req.body.slug;
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'role', 400, 'update.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'role', 404, 'update.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  // Так же нельзя обновлять роли admin и default
  if (item.slug === 'admin') {
    logger('error', 'role', 403, 'update.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  if (item.slug === 'default' && req.role !== 'admin') {
    logger('error', 'role', 403, 'update.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const updateItem = req.body;
  delete updateItem.id;

  const updatedItem = await item.update(updateItem).catch((err) => {
    logger('error', 'role', 400, 'update.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(updatedItem);
};

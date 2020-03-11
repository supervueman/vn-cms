const Model = require('../model');

module.exports = async (req, res) => {
  // Если нет доступа к редактированию и ранг роли пользователя ниже ранга редактируемой роли то запретить
  // Так же нельзя обновлять роли admin и default
  if (!req.rules.is_role_update || req.rang < req.body.rang || req.body.slug === 'default' || req.body.slug === 'admin') {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.params.id).catch(() => {
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

  // Так же нельзя обновлять роли admin и default
  if (item.slug === 'default' || item.slug === 'admin') {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const updateItem = req.body;
  delete updateItem.id;

  const updatedItem = await item.update(updateItem).catch(() => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(updatedItem);
};

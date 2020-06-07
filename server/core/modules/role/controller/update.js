const Model = require('../model');

module.exports = async (req, res) => {
  // Если нет доступа к редактированию и ранг роли пользователя ниже ранга редактируемой роли то запретить
  // Так же нельзя обновлять роли admin и default
  if (!req.rules.is_role_update || req.rang < req.body.rang) {
    logger('error', 'role', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  if (req.body.slug === 'default') {
    delete req.body.slug;
  }

  if (req.body.slug === 'admin') {
    delete req.body.slug;
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'role', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'role', 404, 'update.js');
    sendRes({ res, status: 404 });
  }

  // Так же нельзя обновлять роли admin и default
  if (item.slug === 'admin') {
    logger('error', 'role', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  if (item.slug === 'default' && req.role !== 'admin') {
    logger('error', 'role', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const updateItem = req.body;
  delete updateItem.id;

  const updatedItem = await item.update(updateItem).catch((err) => {
    logger('error', 'role', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: updatedItem });
};

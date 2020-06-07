const Model = require('../model');

module.exports = async (req, res) => {
  // Если нет доступа для удаления и ранг роли пользователя ниже ранга удаляемой роли то запретить
  // Так же нельзя удалять роли admin и default
  if (!req.rules.is_role_delete || req.rang < req.body.rang) {
    logger('error', 'role', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'role', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  if (item.slug === 'admin' || item.slug === 'default') {
    logger('error', 'role', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'role', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200 });
};

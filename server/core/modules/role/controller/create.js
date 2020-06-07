const Model = require('../model');

module.exports = async (req, res) => {
  // Если есть доступ к созданию ролей или если ранг роли пользователя меньше ранга создаваемой роли то запретить
  // Так же нельзя обновлять роли admin и default
  if (
    !req.rules.is_role_create ||
    req.rang < req.body.rang ||
    req.body.slug === 'default' ||
    req.body.slug === 'admin'
  ) {
    logger('error', 'role', 403, 'create.js');
    sendRes({ res, status: 403 });
  }

  const createdItem = await Model.create(req.body).catch((err) => {
    logger('error', 'role', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: createdItem });
};

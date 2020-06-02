const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_role_read) {
    logger('error', 'role', 403, 'findAll.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  // Возвращаем все роли у которых ранг меньше или равен рангу роли пользователя
  if (!filter.where) {
    filter.where = {};
  }
  filter.where.rang = {
    $lte: req.rang
  };

  const items = await Model.findAll(filter).catch((err) => {
    logger('error', 'role', 400, 'findAll.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(items);
};

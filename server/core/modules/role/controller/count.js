const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_role_read) {
    logger('error', 'role', 403, 'count.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  // Возвращаем все роли у которых ранг меньше или равен рангу роли пользователя
  if (!filter.where) {
    filter.where = {};
  }
  filter.where.rang = {
    $lte: req.rang
  };

  const count = await Model.count(filter).catch((err) => {
    logger('error', 'role', 400, 'count.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: { count } });
};

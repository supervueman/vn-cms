const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_role_read) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || "{}");

  // Возвращаем все роли у которых ранг меньше или равен рангу роли пользователя
  if (!filter.where) {
    filter.where = {};
  }
  filter.where.rang = {
    $lte: req.rang
  };

  const count = await Model.count(filter).catch(() => {
    res.status(400).send({
      message: 'Bad Request'
    });
    return;
  });

  res.status(200).send({
    count
  });
};

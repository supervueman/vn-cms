const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_role_read) {
    res.status(403).send({
      message: 'Access denied!'
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

  const items = await Model.findAll(filter);

  res.status(200).send(items);
};

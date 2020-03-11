const Model = require('../model');

module.exports = async (req, res) => {
  // Если нет доступа для удаления и ранг роли пользователя ниже ранга удаляемой роли то запретить
  // Так же нельзя удалять роли admin и default
  if (!req.rules.is_role_delete || req.rang < req.body.rang) {
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

  if (item.slug === 'admin' || item.slug === 'default') {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send({
    message: 'OK'
  });
};

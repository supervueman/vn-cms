const Model = require('../model');

// Helpers
module.exports = async (req, res) => {
  if (!req.rules.is_context_delete) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  // Запрет на удаление кнтекста root
  const item = Model.findByPk(req.body.id).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (item.slug === 'root') {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  await Model.destroy({
    where: {
      id: req.body.id
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

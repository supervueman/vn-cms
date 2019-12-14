const Model = require('../model');

module.exports = async (req, res) => {
  // Если есть доступ к созданию или если псевдоним контекста является root то запретить
  if (!req.rules.is_context_create || req.body.slug === 'root') {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findOne({
    where: {
      slug: req.body.slug
    }
  }).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  // Если существует то не создавать
  if (item) {
    res.status(409).send({
      message: 'Conflict'
    });
    return;
  }

  const createdItem = await Model.create(req.body).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(createdItem);
};

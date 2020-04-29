const Model = require('../model');

const createDir = require('../../../handlers/createDir');

module.exports = async (req, res) => {
  // Если есть доступ к созданию или если псевдоним контекста является root то запретить
  if (!req.rules.is_context_create || req.body.slug === 'root') {
    logger('error', 'context', 403, 'create.js', 'Forbidden');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findOne({
    where: {
      slug: req.body.slug
    }
  }).catch((err) => {
    logger('error', 'context', 400, 'create.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  // Если существует то не создавать
  if (item) {
    logger('error', 'context', 400, 'create.js', 'Conflict');
    res.status(409).send({
      message: 'Conflict'
    });
    return;
  }

  const createdItem = await Model.create(req.body).catch((err) => {
    logger('error', 'context', 400, 'create.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  await createDir(`../files/${createdItem.slug}`);

  res.status(200).send(createdItem);
};

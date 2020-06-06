const Model = require('../model');

const createDir = require('../../filesystem/handlers/createDir');

module.exports = async (req, res) => {
  // Если есть доступ к созданию или если псевдоним контекста является root то запретить
  if (!req.rules.is_context_create || req.body.slug === 'root') {
    logger('error', 'context', 403, 'create.js', 'Forbidden');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findOne({
    where: {
      slug: req.body.slug
    }
  }).catch((err) => {
    logger('error', 'context', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  // Если существует то не создавать
  if (item) {
    logger('error', 'context', 400, 'create.js', 'Conflict');
    sendRes({ res, status: 409 });
  }

  const createdItem = await Model.create(req.body).catch((err) => {
    logger('error', 'context', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  await createDir(`../files/${createdItem.slug}`);

  sendRes({ res, status: 200, data: createdItem });
};

const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_context_update) {
    logger('error', 'context', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'context', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'context', 404, 'update.js');
    sendRes({ res, status: 404 });
  }

  // Запрет на обновление контекста root
  if (item.slug === 'root') {
    logger('error', 'context', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  delete req.body.id;

  const updatedItem = await item.update(req.body).catch((err) => {
    logger('error', 'context', 400, 'update.js');
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, item: updatedItem });
};

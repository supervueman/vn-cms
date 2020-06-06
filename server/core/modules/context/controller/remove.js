const Model = require('../model');

// Helpers
module.exports = async (req, res) => {
  if (!req.rules.is_context_delete) {
    logger('error', 'context', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'context', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  // Запрет на удаление контекста root
  if (item.slug === 'root') {
    logger('error', 'context', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'context', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 204 });
};

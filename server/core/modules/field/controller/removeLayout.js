const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_update) {
    logger('error', 'field', 403, 'removeLayout.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.body.id).catch((err) => {
    logger('error', 'field', 400, 'removeLayout.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'field', 404, 'removeLayout.js');
    sendRes({ res, status: 404 });
  }

  for await (const layout of req.body.layouts) {
    await item.removeLayout(layout).catch((err) => {
      logger('error', 'field', 400, 'removeLayout.js', err);
      sendRes({ res, status: 400 });
    });
  }

  const updatedItem = await Model.findByPk(req.body.id, {
    include: ['layouts']
  }).catch((err) => {
    logger('error', 'field', 400, 'removeLayout.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: updatedItem });
};

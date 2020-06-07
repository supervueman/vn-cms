const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_layout_create) {
    logger('error', 'layout', 403, 'create.js');
    sendRes({ res, status: 403 });
  }

  const createdItem = await Model.create(req.body).catch((err) => {
    logger('error', 'layout', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: createdItem });
};

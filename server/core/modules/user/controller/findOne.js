const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_user_read) {
    logger('error', 'user', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findOne(filter);

  if (!item) {
    logger('error', 'user', 404, 'findOne.js');
    sendRes({ res, status: 404 });
  }

  if (!req.adminAccess && item.contextId !== req.context.id) {
    logger('error', 'user', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  sendRes({ res, status: 200, data: item });
};

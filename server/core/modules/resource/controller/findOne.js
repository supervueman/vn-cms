const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_read) {
    logger('error', 'resource', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findOne(filter).catch((err) => {
    logger('error', 'resource', 400, 'findOne.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'resource', 404, 'findOne.js');
    sendRes({ res, status: 404 });
  }

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'resource', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  sendRes({ res, status: 200, data: item });
};

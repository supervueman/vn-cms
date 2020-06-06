const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_context_read) {
    logger('error', 'context', 403, 'findAll.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  if (!req.adminAccess) {
    if (!filter.where) {
      filter.where = {};
    }
    filter.where.id = req.context.id;
  }

  const items = await Model.findAll(filter).catch((err) => {
    logger('error', 'context', 400, 'findAll.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200 });
};

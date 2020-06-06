const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_context_read) {
    logger('error', 'context', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findOne(filter).catch((err) => {
    logger('error', 'context', 400, 'findOne.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: item });
};

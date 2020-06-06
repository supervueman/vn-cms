const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_read) {
    logger('error', 'field', 403, 'count.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const count = await Model.count(filter).catch((err) => {
    logger('error', 'field', 400, 'count.js', err);
    sendRes({ res, status: 403 });
  });

  sendRes({ res, status: 200, data: { count } });
};

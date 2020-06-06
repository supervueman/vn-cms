const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_read) {
    logger('error', 'field', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findOne(filter).catch((err) => {
    logger('error', 'field', 400, 'findOne.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'field', 404, 'findOne.js');
    sendRes({ res, status: 404 });
  }

  sendRes({ res, status: 200, data: item });
};

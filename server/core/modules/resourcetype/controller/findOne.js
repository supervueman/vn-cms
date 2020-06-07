const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_type_read) {
    logger('error', 'resourcetype', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const items = await Model.findOne(filter).catch((err) => {
    logger('error', 'resourcetype', 403, 'findOne.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: items });
};

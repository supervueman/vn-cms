const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_read) {
    logger('error', 'resourcetype', 403, 'findAll.js');
    sendRes({ res, status: 403 });
  }

  const items = await Model.findAll().catch((err) => {
    logger('error', 'resourcetype', 400, 'findAll.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: items });
};

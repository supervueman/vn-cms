const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_role_read) {
    logger('error', 'role', 403, 'findByPk.js');
    sendRes({ res, status: 403 });
  }
  const id = req.params.id;

  const item = await Model.findByPk(id);

  if (!item) {
    logger('error', 'role', 404, 'findByPk.js');
    sendRes({ res, status: 404 });
  }

  if (!req.adminAccess && (item.slug === 'admin' || item.slug === 'manager')) {
    logger('error', 'role', 403, 'findByPk.js');
    sendRes({ res, status: 403 });
  }

  sendRes({ res, status: 200, data: item });
};

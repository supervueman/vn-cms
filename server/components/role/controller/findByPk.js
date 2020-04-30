const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_role_read) {
    logger('error', 'role', 403, 'findByPk.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }
  const id = req.params.id;

  const item = await Model.findByPk(id);

  if (!item) {
    logger('error', 'role', 404, 'findByPk.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  if (!req.adminAccess && (item.slug === 'admin' || item.slug === 'manager')) {
    logger('error', 'role', 403, 'findByPk.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  res.status(200).send(item);
};

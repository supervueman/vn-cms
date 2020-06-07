const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_user_update_role) {
    logger('error', 'user', 403, 'changeRole.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.body.userId).catch((err) => {
    logger('error', 'user', 400, 'changeRole.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'user', 404, 'changeRole.js');
    sendRes({ res, status: 404 });
  }

  // Если не админ и контексты не совпадают то запретить
  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'user', 403, 'changeRole.js');
    sendRes({ res, status: 403 });
  }

  await item
    .update({
      roleId: req.body.roleId
    })
    .catch((err) => {
      logger('error', 'user', 400, 'changeRole.js', err);
      sendRes({ res, status: 400 });
    });

  sendRes({ res, status: 200 });
};

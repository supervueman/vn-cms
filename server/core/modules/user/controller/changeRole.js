const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_user_update_role) {
    logger('error', 'user', 403, 'changeRole.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.body.userId).catch((err) => {
    logger('error', 'user', 400, 'changeRole.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'user', 404, 'changeRole.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  // Если не админ и контексты не совпадают то запретить
  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'user', 403, 'changeRole.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  await item
    .update({
      roleId: req.body.roleId
    })
    .catch((err) => {
      logger('error', 'user', 400, 'changeRole.js', err);
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });

  res.status(200).send({
    message: 'OK'
  });
};

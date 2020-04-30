const Model = require('../model');

const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  if (!req.rules.is_user_update) {
    logger('error', 'user', 403, 'changePassword.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id).catch((err) => {
    logger('error', 'user', 400, 'changePassword.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'user', 404, 'changePassword.js');
    res.status(404).send({
      message: 'Not found'
    });
  }

  // Если не админ и контексты не совпадают то запретить
  if (!req.adminAccess && item.contextId !== req.context.id) {
    logger('error', 'user', 403, 'changePassword.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const isCompare = await bcrypt.compare(req.body.oldPassword, item.password);

  if (!isCompare) {
    logger('error', 'user', 409, 'changePassword.js');
    res.status(409).send({
      message: 'Conflict'
    });
    return;
  }

  const hashPw = await bcrypt.hash(req.body.newPassword, 12);

  await item
    .update({
      password: hashPw
    })
    .catch((err) => {
      logger('error', 'user', 400, 'changePassword.js', err);
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });

  res.status(200).send({
    message: 'OK'
  });
};

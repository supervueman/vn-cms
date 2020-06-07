const Model = require('../model');

const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  if (!req.rules.is_user_update) {
    logger('error', 'user', 403, 'changePassword.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.body.id).catch((err) => {
    logger('error', 'user', 400, 'changePassword.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'user', 404, 'changePassword.js');
    sendRes({ res, status: 404 });
  }

  // Если не админ и контексты не совпадают то запретить
  if (!req.adminAccess && item.contextId !== req.context.id) {
    logger('error', 'user', 403, 'changePassword.js');
    sendRes({ res, status: 403 });
  }

  const isCompare = await bcrypt.compare(req.body.oldPassword, item.password);

  if (!isCompare) {
    logger('error', 'user', 409, 'changePassword.js');
    sendRes({ res, status: 409 });
  }

  const hashPw = await bcrypt.hash(req.body.newPassword, 12);

  await item
    .update({
      password: hashPw
    })
    .catch((err) => {
      logger('error', 'user', 400, 'changePassword.js', err);
      sendRes({ res, status: 400 });
    });

  sendRes({ res, status: 200 });
};

const Model = require('../model');

// Validators
const phoneValidator = require('../../../../validators/phoneRUValidator');

module.exports = async (req, res) => {
  if (!req.rules.is_user_update) {
    logger('error', 'user', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'user', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'user', 404, 'update.js');
    sendRes({ res, status: 404 });
  }

  // Если не админ и контексты не совпадают то запретить
  if (!req.adminAccess && item.contextId !== req.context.id) {
    logger('error', 'user', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const phone = phoneValidator(req.body.phone);
  const updateUser = req.body;

  if (phone) {
    updateUser.phone = phone;
  }

  delete updateUser.email;
  delete updateUser.id;
  delete updateUser.password;
  delete updateUser.token;
  delete updateUser.roleId;

  const updatedItem = await item.update(updateUser).catch((err) => {
    logger('error', 'user', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  const filter = JSON.parse(req.query.filter || '{}');

  const newItem = await Model.findByPk(updatedItem.id, filter).catch((err) => {
    logger('error', 'user', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: newItem });
};

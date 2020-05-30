const Model = require('../model');

// Validators
const phoneRUValidator = require('../../../validators/phoneRUValidator');

module.exports = async (req, res) => {
  if (!req.rules.is_user_update) {
    logger('error', 'user', 403, 'update.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'user', 400, 'update.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'user', 404, 'update.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  // Если не админ и контексты не совпадают то запретить
  if (!req.adminAccess && item.contextId !== req.context.id) {
    logger('error', 'user', 403, 'update.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const phone = phoneRUValidator(req.body.phone);
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
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  const filter = JSON.parse(req.query.filter || '{}');

  const newItem = await Model.findByPk(updatedItem.id, filter).catch((err) => {
    logger('error', 'user', 400, 'update.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(newItem);
};

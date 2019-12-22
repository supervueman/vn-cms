const Model = require('../model');

const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  if (!req.rules.is_user_update) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    res.status(404).send({
      message: 'Not found'
    });
  }

  // Если не админ и контексты не совпадают то запретить
  if (!req.adminAccess && item.contextId !== req.context.id) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const isCompare = await bcrypt.compare(
    req.body.oldPassword,
    item.password
  );

  if (!isCompare) {
    res.status(409).send({
      message: 'Conflict'
    });
    return;
  }

  const hashPw = await bcrypt.hash(req.body.newPassword, 12);

  await item.update({
    password: hashPw
  }).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send({
    message: 'OK'
  });
};

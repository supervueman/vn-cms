const Model = require('../model');

// Helpers
const removeDir = require('../../../handlers/removeDir');

module.exports = async (req, res) => {
  if (!req.rules.is_user_delete) {
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
    return;
  }

  // Если не админ и контексты не совпадают то запретить
  if (!req.adminAccess && item.contextId !== req.context.id) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  await Model.destroy({
    where: {
      id: req.body.id
    }
  }).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(204).send({
    message: 'No content'
  });
};

const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_user_update) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
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

  const updateUser = req.body;
  delete updateUser.email;
  delete updateUser.id;
  delete updateUser.password;
  delete updateUser.token;

  const updatedItem = await item.update(updateUser).catch((err) => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  const filter = JSON.parse(req.query.filter || '{}');

  const newItem = await Model.findByPk(updatedItem.id, filter).catch((err) => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(newItem);
};

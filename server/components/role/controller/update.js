const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_roles_update) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id);

  if (!item) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }
  // Если не админ и роль равна admin или manager и при этом роль не совпадает с обновленной
  // Если же админ и роль равна admin или manager и при этом роль не совпадает с обновленной
  if (!req.adminAccess && (item.slug === 'admin' || item.slug === 'manager') && item.slug !== req.body.slug) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  } else if (req.adminAccess && (item.slug === 'admin' || item.slug === 'manager') && item.slug !== req.body.slug) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const updateItem = req.body;
  delete updateItem.id;

  const updatedItem = await item.update(updateItem);

  res.status(200).send(updatedItem);
};

const Model = require('../model');

module.exports = async (req, res) => {
  // if (!req.rules.is_delivery_update) {
  //   res.status(403).send({
  //     message: 'Access denied!'
  //   });
  //   return;
  // }

  const item = await Model.findByPk(req.body.id);

  if (!item) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }

  const updateItem = req.body;

  if (req.adminAccess || req.managerAccess) {
    updateItem.managerId = req.profile.id;
  } else {
    updateItem.managerId = req.profile.userId;
  }

  const updatedItem = await item.update(updateItem);

  res.status(200).send(updatedItem);
};

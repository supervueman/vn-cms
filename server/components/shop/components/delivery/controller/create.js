const Model = require('../model');

module.exports = async (req, res) => {
  // if (!req.rules.is_delivery_create) {
  //   res.status(403).send({
  //     message: 'Access denied!'
  //   });
  //   return;
  // }

  const item = req.body;
  if (req.adminAccess || req.managerAccess) {
    item.managerId = req.profile.id;
  } else {
    item.managerId = req.profile.userId;
  }

  const createdItem = await Model.create(item);

  res.status(200).send(createdItem);
};

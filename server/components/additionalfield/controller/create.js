const Model = require('../model');

module.exports = async (req, res) => {
  if (!(req.adminAccess || req.managerAccess)) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const createdItem = await Model.create(req.body);

  res.status(200).send(createdItem);
}

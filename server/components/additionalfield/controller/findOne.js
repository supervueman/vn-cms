const Model = require('../model');

module.exports = async (req, res) => {
  if (!(req.adminAccess || req.managerAccess)) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || "{}");

  const item = await Model.findOne(filter);

  if (!item) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }

  res.status(200).send(item);
}

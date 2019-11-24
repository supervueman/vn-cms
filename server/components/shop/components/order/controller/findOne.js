const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_orders_read) {
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

  if (req.adminAccess) {
    res.status(200).send(item)
  } else if (req.managerAccess && item.managerId === req.profile.id) {
    res.status(200).send(item);
  } else if (!(req.adminAccess || req.managerAccess) && item.managerId === req.profile.userId) {
    res.status(200).send(item);
  } else if (item.ownerId === req.profile.id) {
    res.status(200).send(item);
  } else {
    res.status(403).send({
      message: 'Access denied!'
    });
  }
}

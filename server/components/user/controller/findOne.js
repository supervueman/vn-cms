const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_users_read) {
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
  }

  if ((req.managerAccess && String(item.userId) === String(req.profile.id)) || (!req.managerAccess && String(item.userId) === String(req.profile.userId)) || req.adminAccess) {
    res.status(200).send(item);
  } else {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }
}

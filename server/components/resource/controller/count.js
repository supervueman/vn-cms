const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resources_read) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || "{}");

  if (req.managerAccess) {
    filter.where.userId = req.profile.id;
  } else if (!req.managerAccess && !req.adminAccess) {
    filter.where.userId = req.profile.userId;
  }

  const count = await Model.count(filter);

  res.status(200).send({
    count
  });
}

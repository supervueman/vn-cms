const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_roles_read) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || "{}");

  if (req.managerAccess) {
    if (!filter.where) {
      filter.where = {};
    }
    filter.where.slug = {
      $and: [{
        $ne: 'admin'
      }, {
        $ne: 'manager'
      }]
    };
  }

  const count = await Model.count(filter);

  res.status(200).send({
    count
  });
};

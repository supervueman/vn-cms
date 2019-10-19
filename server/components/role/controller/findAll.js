const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_roles_read) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || "{}");

  if (!req.adminAccess) {
    if (!filter.where) {
      filter.where = {};
    }
    filter.where.slug = {
      $and: [{
        $ne: 'admin'
      }, {
        $ne: 'manager'
      }]
    }
  }

  const items = await Model.findAll(filter);

  res.status(200).send(items);
}

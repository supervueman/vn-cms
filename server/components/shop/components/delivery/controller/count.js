const Model = require('../model');

module.exports = async (req, res) => {
  const filter = JSON.parse(req.query.filter || "{}");

  if (req.rules.is_deliveries_read) {
    if (req.adminAccess) {} else if (req.managerAccess) {
      filter.where = {
        managerId: req.profile.id
      }
    } else {
      filter.where = {
        managerId: req.profile.userId,
      }
    }
  } else if (!req.rules.is_orders_read) {
    filter.where = {
      ownerId: req.profile.id
    };
  }

  const count = await Model.count(filter);

  res.status(200).send({
    count
  });
};
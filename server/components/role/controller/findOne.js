const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_role_read) {
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

  if (!req.adminAccess && (item.slug === 'admin' || item.slug === 'manager')) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  res.status(200).send(item);
};

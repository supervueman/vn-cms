const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_read) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || "{}");

  const count = await Model.count(filter);

  res.status(200).send({
    count
  });
};

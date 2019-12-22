const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_system_setting_read) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || "{}");

  const count = await Model.count(filter).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send({
    count
  });
};

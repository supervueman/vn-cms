const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_read) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const items = await Model.findAll().catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(items);
};

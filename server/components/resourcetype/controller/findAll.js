const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resources_read) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const items = await Model.findAll();

  res.status(200).send(items);
}

const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_role_create) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  if (req.body.slug === 'admin' || req.body.slug === 'manager') {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const createdItem = await Model.create(req.body);
  res.status(200).send(createdItem);
};

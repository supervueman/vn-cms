const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_create) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const createdItem = await Model.create(req.body);

  for await (layout of req.body.layouts) {
    await createdItem.addLayout(layout);
  }

  res.status(200).send(createdItem);
}

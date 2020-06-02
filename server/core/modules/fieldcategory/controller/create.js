const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_category_create) {
    logger('error', 'fieldcategory', 403, 'create.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const createdItem = await Model.create(req.body).catch((err) => {
    logger('error', 'fieldcategory', 400, 'create.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(createdItem);
};

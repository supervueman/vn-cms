const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_create) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id);

  if (!item) {
    res.status(404).send({
      message: 'Not found!'
    });
  }

  const translationItem = await item.addTranslation(req.body.translationId);

  res.status(200).send({
    translationItem
  });
};

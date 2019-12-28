const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_create) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    res.status(404).send({
      message: 'Not found'
    });
  }

  const translationItem = await item.addTranslation(req.body.translationId).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send({
    translationItem
  });
};

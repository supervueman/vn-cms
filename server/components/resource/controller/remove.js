const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_delete) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.params.id).catch(err => {
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

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(204).send({
    message: 'No content'
  });
};

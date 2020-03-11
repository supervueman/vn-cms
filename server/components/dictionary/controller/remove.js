const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_dictionary_delete) {
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
      message: 'Not found!'
    });
    return;
  }

  await Model.destroy({
    where: {
      id: req.body.id
    }
  }).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(204).send({
    message: 'Not content'
  });
};

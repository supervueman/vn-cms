const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_dictionary_delete) {
    logger('error', 'lexicon', 403, 'remove.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'lexicon', 400, 'remove.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'lexicon', 404, 'remove.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  await Model.destroy({
    where: {
      id: req.body.id
    }
  }).catch((err) => {
    logger('error', 'lexicon', 400, 'remove.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(204).send({
    message: 'Not content'
  });
};

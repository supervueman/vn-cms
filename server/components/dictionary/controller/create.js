const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_dictionary_create) {
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const existItem = await Model.findOne({
    where: {
      lang: req.body.lang
    }
  }).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (existItem) {
    res.status(409).send({
      message: 'Conflict'
    });
  }

  const createdItem = await Model.create(req.body).catch(err => {
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(createdItem);
};

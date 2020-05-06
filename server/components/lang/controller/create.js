const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_lang_create) {
    logger('error', 'lang', 403, 'create.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const existItem = await Model.findOne({
    where: {
      slug: req.body.slug
    }
  }).catch((err) => {
    logger('error', 'lang', 403, 'create.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (existItem) {
    logger('error', 'lang', 409, 'create.js');
    res.status(409).send({
      message: 'Conflict'
    });
  }

  const createdItem = await Model.create(req.body).catch((err) => {
    logger('error', 'lang', 400, 'create.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(createdItem);
};

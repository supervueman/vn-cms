const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.isAuth) {
    logger('error', 'additionalfields', 403, 'findOne.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findOne(filter).catch((err) => {
    logger('error', 'additionalfields', 400, 'findOne.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'additionalfields', 404, 'findOne.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  res.status(200).send(item);
};

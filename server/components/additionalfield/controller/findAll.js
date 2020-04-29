const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.isAuth) {
    logger('error', 'additionalfields', 403, 'findAll.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const items = await Model.findAll(filter).catch((err) => {
    logger('error', 'additionalfields', 400, 'findAll.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(items);
};

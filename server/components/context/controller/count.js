const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_context_read) {
    logger('error', 'context', 403, 'count.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const count = await Model.count(filter).catch((err) => {
    logger('error', 'context', 400, 'count.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send({
    count
  });
};

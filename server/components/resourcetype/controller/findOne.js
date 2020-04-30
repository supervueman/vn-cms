const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_resource_type_read) {
    logger('error', 'resourcetype', 403, 'findOne.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const items = await Model.findOne(filter).catch((err) => {
    logger('error', 'resourcetype', 403, 'findOne.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  res.status(200).send(items);
};

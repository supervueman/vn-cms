const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_system_setting_read) {
    logger('error', 'systemsetting', 403, 'findByPk.js');
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id).catch((err) => {
    logger('error', 'systemsetting', 400, 'findByPk.js', err);
    res.status(400).send({
      message: 'Bad request'
    });
    return;
  });

  if (!item) {
    logger('error', 'systemsetting', 404, 'findByPk.js');
    res.status(404).send({
      message: 'Not found'
    });
    return;
  }

  res.status(200).send(item);
};

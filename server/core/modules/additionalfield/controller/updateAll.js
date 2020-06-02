const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.isAuth) {
    logger('error', 'additionalfields', 403, 'updateAll.js');
    res.status(403).send({
      message: 'Forbidden'
    });
    return;
  }

  for (let field of req.body.fields) {
    const item = await Model.findByPk(field.id).catch((err) => {
      logger('error', 'additionalfields', 400, 'updateAll.js', err);
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });

    if (!item) {
      logger('error', 'additionalfields', 404, 'updateAll.js');
      res.status(404).send({
        message: 'Not found'
      });
      return;
    }

    await item.update(field).catch((err) => {
      logger('error', 'additionalfields', 403, 'updateAll.js', err);
      res.status(400).send({
        message: 'Bad request'
      });
      return;
    });
  }

  res.status(200).send({
    message: 'Success!'
  });
};

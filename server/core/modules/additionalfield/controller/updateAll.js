const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.isAuth) {
    logger('error', 'additionalfields', 403, 'updateAll.js');
    sendRes({ res, status: 403 });
  }

  for (let field of req.body.fields) {
    const item = await Model.findByPk(field.id).catch((err) => {
      logger('error', 'additionalfields', 400, 'updateAll.js', err);
      sendRes({ res, status: 400 });
    });

    if (!item) {
      logger('error', 'additionalfields', 404, 'updateAll.js');
      sendRes({ res, status: 404 });
    }

    await item.update(field).catch((err) => {
      logger('error', 'additionalfields', 400, 'updateAll.js', err);
      sendRes({ res, status: 400 });
    });
  }

  sendRes({ res, status: 200 });
};

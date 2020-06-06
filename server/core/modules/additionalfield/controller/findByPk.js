const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.isAuth) {
    logger('error', 'additionalfields', 403, 'findByPk.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findByPk(req.params.id, filter).catch((err) => {
    logger('error', 'additionalfields', 400, 'findByPk.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    sendRes({ res, status: 404 });
  }

  sendRes({ res, status: 200, data: item });
};
